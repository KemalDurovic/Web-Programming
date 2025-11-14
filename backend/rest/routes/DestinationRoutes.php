<?php

Flight::route('GET /destinations/@id', function($id){
   Flight::json(Flight::destinationService()->getById($id));
});

Flight::route('GET /destinations', function(){
   $badge = Flight::request()->query['badge'] ?? null;
   if ($badge) {
       Flight::json(Flight::destinationService()->getByBadge($badge));
   } else {
       Flight::json(Flight::destinationService()->getAll());
   }
});

Flight::route('POST /destinations', function(){
   $data = Flight::request()->data->getData();
   Flight::json(Flight::destinationService()->create($data));
});

Flight::route('PUT /destinations/@id', function($id){
   $data = Flight::request()->data->getData();
   Flight::json(Flight::destinationService()->update($id, $data));
});

Flight::route('PATCH /destinations/@id', function($id){
   $data = Flight::request()->data->getData();
   Flight::json(Flight::destinationService()->update($id, $data));
});

Flight::route('DELETE /destinations/@id', function($id){
   Flight::json(Flight::destinationService()->delete($id));
});
?>
