module Tree exposing (..)

type Node a
    = Empty
    | Node a (List (Node a))

empty : Node a
empty =
    Empty

insert : a -> Node a -> Node a
insert x node =
    case node of
      Empty ->
          Node x []

      Node y children ->
          Node y (children ++ (List.singleton (Node x [])))

insertList : List a -> Node a -> Node a
insertList l node =
    case node of
      Empty ->
        node

      Node x children ->
        Node x (children ++ (List.map (\item -> insert item Empty) l))

map : (a -> b) -> Node a -> Node b
map f node =
    case node of
      Empty -> Empty

      Node v children ->
          Node (f v) (List.map (\n -> map f n) children)