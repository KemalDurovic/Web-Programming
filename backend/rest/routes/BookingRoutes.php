<?php

Flight::route('GET /bookings/@id', function($id){
   Flight::json(Flight::bookingService()->getById($id));
});

Flight::route('GET /bookings', function(){
   $user_id = Flight::request()->query['user_id'] ?? null;
   if ($user_id) {
       Flight::json(Flight::bookingService()->getByUserId($user_id));
   } else {
       Flight::json(Flight::bookingService()->getAll());
   }
});

Flight::route('POST /bookings', function(){
   $data = Flight::request()->data->getData();
   Flight::json(Flight::bookingService()->create($data));
});

Flight::route('PUT /bookings/@id', function($id){
   $data = Flight::request()->data->getData();
   Flight::json(Flight::bookingService()->update($id, $data));
});

Flight::route('PATCH /bookings/@id', function($id){
   $data = Flight::request()->data->getData();
   Flight::json(Flight::bookingService()->update($id, $data));
});

Flight::route('DELETE /bookings/@id', function($id){
   Flight::json(Flight::bookingService()->delete($id));
});
?>