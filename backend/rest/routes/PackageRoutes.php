<?php
error_log("PackageRoutes.php is being loaded!");
Flight::route('GET /packages/@id', function($id){
   Flight::json(Flight::packageService()->getById($id));
});

Flight::route('GET /packages', function(){
   $category = Flight::request()->query['category'] ?? null;
   if ($category) {
       Flight::json(Flight::packageService()->getByCategory($category));
   } else {
       Flight::json(Flight::packageService()->getAll());
   }
});

Flight::route('POST /packages', function(){
   $data = Flight::request()->data->getData();
   Flight::json(Flight::packageService()->create($data));
});

Flight::route('PUT /packages/@id', function($id){
   $data = Flight::request()->data->getData();
   Flight::json(Flight::packageService()->update($id, $data));
});

Flight::route('PATCH /packages/@id', function($id){
   $data = Flight::request()->data->getData();
   Flight::json(Flight::packageService()->update($id, $data));
});

Flight::route('DELETE /packages/@id', function($id){
   Flight::json(Flight::packageService()->delete($id));
});
?>