# rescript-prelude
NobleAI Opinionated Prelude for unification of Belt/Js and other antique core libraries.

# Style 
* Data First
* Prefer arrows
* Immutable implementations top level
* Mutable implementations in module Mut
* Spend the energy to give optionality/variant encoding when core returns primitive-encoded exceptional values, e.g. Array.indexOf
* Prefer Promise over async
* Trailing _ in function name variation of other function returning unit
* Clearly identify reference/strict equality since we dont often have reference equality.