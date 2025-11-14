<?php
Flight::route('GET /users/@id', function($id){
   Flight::json(Flight::userService()->getById($id));
});

Flight::route('GET /users', function(){
   $email = Flight::request()->query['email'] ?? null;
   if ($email) {
       Flight::json(Flight::userService()->getByEmail($email));
   } else {
       Flight::json(Flight::userService()->getAll());
   }
});

Flight::route('POST /users', function(){
   $data = Flight::request()->data->getData();
   Flight::json(Flight::userService()->create($data));
});

Flight::route('PUT /users/@id', function($id){
   $data = Flight::request()->data->getData();
   Flight::json(Flight::userService()->update($id, $data));
});

Flight::route('PATCH /users/@id', function($id){
   $data = Flight::request()->data->getData();
   Flight::json(Flight::userService()->update($id, $data));
});

Flight::route('DELETE /users/@id', function($id){
   Flight::json(Flight::userService()->delete($id));
});
?>