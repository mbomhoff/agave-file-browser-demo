import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Http exposing (..)
import Json.Decode as Decode exposing (..)
import Dict exposing (..)
import Debug
import Tree exposing (..)

main =
  Html.program
    { init = init "/mbomhoff" "1659523cc63cde433abf53b8afb6cab5"
    , view = view
    , update = update
    , subscriptions = subscriptions
    }


-- MODEL

type alias Item =
  { label : String
  , typ : String
  , path : String
  }

type alias Model =
  { home : String
  , path : String
  , token : String
  , tree : Node Item
  }

init : String -> String -> (Model, Cmd Msg)
init path token =
  ( Model path path token (Node (Item path "dir" path) [])
  , getFiles path token
  )


-- UPDATE

type Msg = NewFiles (Result Http.Error FilesResponse) | Open String | Home | Refresh

update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
  case msg of
    NewFiles (Ok filesResponse) ->
      (Model model.home filesResponse.path model.token (Node (Item filesResponse.path "dir" filesResponse.path) (List.map (\r -> Node (Item r.name r.typ r.path) []) filesResponse.result)), Cmd.none)

    NewFiles (Err _) ->
      (model, Cmd.none)

    Open path ->
      (model, getFiles path model.token)

    Home ->
      (model, getFiles model.home model.token)

    Refresh ->
      (model, getFiles model.path model.token)


-- VIEW

renderItem : Item -> Html Msg
renderItem item =
  li [] [text item.label]

renderNode : Node Item -> Html Msg
renderNode node =
  case node of
    Empty -> renderItem (Item "empty" "" "")
    Node item children ->
      ul [] ([span [onClick (Open item.path)] [renderItem item]] ++ (List.map renderNode children))

view : Model -> Html Msg
view model =
  div []
  [ h1 [] [text "Agave File Browser Demo"]
    , div []
    [ button [onClick Home] [text "Home"]
    , button [onClick Refresh] [text "Refresh"]
    ]
    , renderNode model.tree
  ]


-- SUBSCRIPTIONS

subscriptions : Model -> Sub Msg
subscriptions model =
  Sub.none


-- HTTP

makeRequest : String -> String -> String -> Http.Request FilesResponse
makeRequest url path token =
  Http.request
    { method          = "GET"
    , headers         = [ Http.header "Content-Type"  "application/json"
                        , Http.header "Authorization" ("Bearer " ++ token) ]
    , url             = url
    , body            = Http.emptyBody
    , expect          = Http.expectJson (decoder path)
    , timeout         = Nothing
    , withCredentials = False
    }

getFiles path token =
  let
    url = "https://agave.iplantc.org/files/v2/listings/" ++ path
  in
    Http.send NewFiles (makeRequest url path token)

type alias FilesResult =
  { name : String
  , typ : String
  , path : String
  }

type alias FilesResponse =
  { path : String
  , status : String
  , result : List FilesResult
  }

resultDecoder : Decode.Decoder FilesResult
resultDecoder =
  Decode.map3 FilesResult
    (Decode.field "name" Decode.string)
    (Decode.field "type" Decode.string)
    (Decode.field "path" Decode.string)

decoder : String -> Decode.Decoder FilesResponse
decoder path =
  Decode.map2 (FilesResponse path)
    (Decode.field "status" Decode.string)
    (Decode.at ["result"] (Decode.list resultDecoder))
