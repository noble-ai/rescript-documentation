let parseExn = Json.parseExn
module Json = Json.Result

module Md = {
  let h1 = s => "# " ++ s ++ "\n"
  let h2 = s => "## " ++ s ++ "\n"
  let h3 = s => "### " ++ s ++ "\n"

  let block = (block, lines) => {
    lines
    ->Array.map(line => `> ${line}`)
    ->Array.append(`{: .block-${block} }`)
    ->Array.joinWith("\n")
  }

  let tip = block("tip")
  let warning = block("warning")
  let danger = block("danger")

  let code = s => `\`${s}\``
  let eol = "  \n"
  let eop = "\n\n"
  let list = items => items->Array.map(x => `- ${x}`)->Array.joinWith(eop)
}

module Kind = {
  type t = [#value | #"type" | #"module"]
  let parse: string => Result.t<t, 'err> = str => {
    switch str {
    | "value" => Result.Ok(#value)
    | "type" => Result.Ok(#"type")
    | "module" => Result.Ok(#"module")
    | x => Result.Error(`unhandled kind ${x}`)
    }
  }
}

let decodeField = (obj, field, decode) =>
  obj->Dict.get(field)->Result.fromOption(field)->Result.bind(decode(_, `${field} value`))

let decodeDocstring = x => x->Json.decodeString("docstring")->Result.map(String.split(_, "\\n"))

let decodeDocstrings = (json, str) =>
  json
  ->Json.decodeArray(`${str} array`)
  ->Result.bind(x => x->Array.map(decodeDocstring)->Result.all->Result.map(Array.join))

module Source = {
  type t = {
    filepath: string,
    line: int,
    col: int,
  }

  let parse: (Json.t, string) => Result.t<t, 'err> = (json, str) => {
    json
    ->Json.decodeObject(`${str} object`)
    ->Result.bind(obj => {
      let filepath = obj->decodeField("filepath", Json.decodeString)
      let line = obj->decodeField("line", Json.decodeInt)
      let col = obj->decodeField("col", Json.decodeInt)

      Result.all3(filepath, line, col)->Result.map(((filepath, line, col)) => {filepath, line, col})
    })
  }
}

module Item = {
  type rec t = {
    id: string,
    kind: Kind.t,
    name: string,
    signature?: string,
    docstrings: array<string>,
    source: Source.t,
    deprecated?: string,
    items?: array<t>,
  }

  let rec parse: Json.t => Result.t<t, 'err> = json => {
    json
    ->Json.decodeObject("item object")
    ->Result.bind(obj => {
      let id = obj->decodeField("id", Json.decodeString)
      let kind = obj->decodeField("kind", Json.decodeString)->Result.bind(Kind.parse)
      let name = obj->decodeField("name", Json.decodeString)
      let signature =
        obj
        ->Dict.get("signature")
        ->Option.bind(x => x->Json.decodeString("signature")->Result.toOption)
      let docstrings = obj->decodeField("docstrings", decodeDocstrings)

      let source = obj->decodeField("source", Source.parse)
      let deprecated = obj->decodeField("deprecated", Json.decodeString)
      let items =
        obj
        ->Dict.get("items")
        ->Result.fromOption("items")
        ->Result.bind(Json.decodeArray(_, "items"))
        ->Result.bind(x => x->Array.map(parse)->Result.all)

      Result.all5(id, kind, name, docstrings, source)->Result.map(((
        id,
        kind,
        name,
        docstrings,
        source,
      )) => {
        id,
        kind,
        name,
        ?signature,
        docstrings,
        source,
        deprecated: ?deprecated->Result.toOption,
        items: ?items->Result.toOption,
      })
    })
  }

  let rec print = item => {
    [
      Some(Md.h3(item.id)),
      // Some(item.name),
      item.signature->Option.map(Md.code),
      item.deprecated->Option.map(x => x->Array.return->Md.warning),
      Some(item.docstrings->Array.joinWith(Md.eol)),
      item.items->Option.map(x => x->Array.map(print)->Array.joinWith(Md.eop)),
    ]
    ->Array.catOptions
    ->Array.joinWith(Md.eol)
  }
}

module Doc = {
  type t = {
    name: string,
    docstrings: array<string>,
    source: Source.t,
    items: array<Item.t>,
  }

  let parse: Json.t => Result.t<t, 'err> = json => {
    json
    ->Json.decodeObject("doc object")
    ->Result.bind(obj => {
      let name = obj->decodeField("name", Json.decodeString)
      let docstrings = obj->decodeField("docstrings", decodeDocstrings)

      let source = obj->decodeField("source", Source.parse)
      let items =
        obj
        ->Dict.get("items")
        ->Result.fromOption("items")
        ->Result.bind(Json.decodeArray(_, "items"))
        ->Result.bind(x => x->Array.map(Item.parse)->Result.all)

      Result.all4(name, docstrings, source, items)->Result.map(((
        name,
        docstrings,
        source,
        items,
      )) => {name, docstrings, source, items})
    })
  }

  let print = doc => {
    [
      Md.h1(doc.name),
      doc.docstrings->Array.joinWith(Md.eol),
      doc.items->Array.map(Item.print)->Array.joinWith(Md.eop),
    ]->Array.joinWith(Md.eop)
  }
}

Node.Process.argv
->Array.sliceFrom(2)
->Array.forEach(file => {
  Node.Fs.readFileSync(file, #utf8)
  ->parseExn
  ->Doc.parse
  ->Result.resolve(~ok=Doc.print, ~err=x => x)
  // ->ignore
  ->Js.Console.log
})
