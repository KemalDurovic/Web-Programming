<?php

Flight::route('GET /reviews/@id', function($id){
   Flight::json(Flight::reviewService()->getById($id));
});

Flight::route('GET /reviews', function(){
   $user_id = Flight::request()->query['user_id'] ?? null;
   if ($user_id) {
       Flight::json(Flight::reviewService()->getByUserId($user_id));
   } else {
       Flight::json(Flight::reviewService()->getAll());
   }
});

Flight::route('POST /reviews', function(){
   $data = Flight::request()->data->getData();
   Flight::json(Flight::reviewService()->create($data));
});

Flight::route('PUT /reviews/@id', function($id){
   $data = Flight::request()->data->getData();
   Flight::json(Flight::reviewService()->update($id, $data));
});

Flight::route('PATCH /reviews/@id', function($id){
   $data = Flight::request()->data->getData();
   Flight::json(Flight::reviewService()->update($id, $data));
});

Flight::route('DELETE /reviews/@id', function($id){
   Flight::json(Flight::reviewService()->delete($id));
});
?>