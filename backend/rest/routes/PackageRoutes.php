<?php
/**
* @OA\Get(
*      path="/packages",
*      tags={"packages"},
*      summary="Get all packages",
*      @OA\Parameter(
*          name="category",
*          in="query",
*          required=false,
*          @OA\Schema(type="string"),
*          description="Optional category to filter packages"
*      ),
*      @OA\Response(
*           response=200,
*           description="Array of all packages in the database"
*      )
* )
*/
Flight::route('GET /packages', function(){
   $category = Flight::request()->query['category'] ?? null;
   if ($category) {
       Flight::json(Flight::packageService()->getByCategory($category));
   } else {
       Flight::json(Flight::packageService()->getAll());
   }
});

/**
* @OA\Get(
*     path="/packages/{id}",
*     tags={"packages"},
*     summary="Get package by ID",
*     @OA\Parameter(
*         name="id",
*         in="path",
*         required=true,
*         description="ID of the package",
*         @OA\Schema(type="integer", example=1)
*     ),
*     @OA\Response(
*         response=200,
*         description="Returns the package with the given ID"
*     )
* )
*/
Flight::route('GET /packages/@id', function($id){
   Flight::json(Flight::packageService()->getById($id));
});

/**
* @OA\Post(
*     path="/packages",
*     tags={"packages"},
*     summary="Add a new package",
*     @OA\RequestBody(
*         required=true,
*         @OA\JsonContent(
*             required={"name", "price"},
*             @OA\Property(property="name", type="string", example="Beach Vacation Package"),
*             @OA\Property(property="price", type="number", format="float", example=1999.99),
*             @OA\Property(property="category", type="string", example="Beach"),
*             @OA\Property(property="duration", type="integer", example=7),
*             @OA\Property(property="destination_id", type="integer", example=1)
*         )
*     ),
*     @OA\Response(
*         response=200,
*         description="New package created"
*     )
* )
*/
Flight::route('POST /packages', function(){
   $data = Flight::request()->data->getData();
   Flight::json(Flight::packageService()->create($data));
});

/**
* @OA\Put(
*     path="/packages/{id}",
*     tags={"packages"},
*     summary="Update an existing package by ID",
*     @OA\Parameter(
*         name="id",
*         in="path",
*         required=true,
*         description="Package ID",
*         @OA\Schema(type="integer", example=1)
*     ),
*     @OA\RequestBody(
*         required=true,
*         @OA\JsonContent(
*             required={"name", "price"},
*             @OA\Property(property="name", type="string", example="Updated Package Name"),
*             @OA\Property(property="price", type="number", format="float", example=2499.99),
*             @OA\Property(property="category", type="string", example="Adventure"),
*             @OA\Property(property="duration", type="integer", example=10)
*         )
*     ),
*     @OA\Response(
*         response=200,
*         description="Package updated"
*     )
* )
*/
Flight::route('PUT /packages/@id', function($id){
   $data = Flight::request()->data->getData();
   Flight::json(Flight::packageService()->update($id, $data));
});

/**
* @OA\Patch(
*     path="/packages/{id}",
*     tags={"packages"},
*     summary="Partially update a package by ID",
*     @OA\Parameter(
*         name="id",
*         in="path",
*         required=true,
*         description="Package ID",
*         @OA\Schema(type="integer", example=1)
*     ),
*     @OA\RequestBody(
*         required=true,
*         @OA\JsonContent(
*             @OA\Property(property="price", type="number", format="float", example=1799.99),
*             @OA\Property(property="duration", type="integer", example=5)
*         )
*     ),
*     @OA\Response(
*         response=200,
*         description="Package partially updated"
*     )
* )
*/
Flight::route('PATCH /packages/@id', function($id){
   $data = Flight::request()->data->getData();
   Flight::json(Flight::packageService()->update($id, $data));
});

/**
* @OA\Delete(
*     path="/packages/{id}",
*     tags={"packages"},
*     summary="Delete a package by ID",
*     @OA\Parameter(
*         name="id",
*         in="path",
*         required=true,
*         description="Package ID",
*         @OA\Schema(type="integer", example=1)
*     ),
*     @OA\Response(
*         response=200,
*         description="Package deleted"
*     )
* )
*/
Flight::route('DELETE /packages/@id', function($id){
   Flight::json(Flight::packageService()->delete($id));
});
?>