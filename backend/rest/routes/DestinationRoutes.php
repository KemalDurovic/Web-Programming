<?php
/**
* @OA\Get(
*      path="/destinations",
*      tags={"destinations"},
*      summary="Get all destinations",
*      @OA\Parameter(
*          name="badge",
*          in="query",
*          required=false,
*          @OA\Schema(type="string"),
*          description="Optional badge to filter destinations"
*      ),
*      @OA\Response(
*           response=200,
*           description="Array of all destinations in the database"
*      )
* )
*/
Flight::route('GET /destinations', function(){
   $badge = Flight::request()->query['badge'] ?? null;
   if ($badge) {
       Flight::json(Flight::destinationService()->getByBadge($badge));
   } else {
       Flight::json(Flight::destinationService()->getAll());
   }
});

/**
* @OA\Get(
*     path="/destinations/{id}",
*     tags={"destinations"},
*     summary="Get destination by ID",
*     @OA\Parameter(
*         name="id",
*         in="path",
*         required=true,
*         description="ID of the destination",
*         @OA\Schema(type="integer", example=1)
*     ),
*     @OA\Response(
*         response=200,
*         description="Returns the destination with the given ID"
*     )
* )
*/
Flight::route('GET /destinations/@id', function($id){
   Flight::json(Flight::destinationService()->getById($id));
});

/**
* @OA\Post(
*     path="/destinations",
*     tags={"destinations"},
*     summary="Add a new destination",
*     @OA\RequestBody(
*         required=true,
*         @OA\JsonContent(
*             required={"name", "country"},
*             @OA\Property(property="name", type="string", example="Paris"),
*             @OA\Property(property="country", type="string", example="France"),
*             @OA\Property(property="description", type="string", example="City of lights"),
*             @OA\Property(property="badge", type="string", example="Popular")
*         )
*     ),
*     @OA\Response(
*         response=200,
*         description="New destination created"
*     )
* )
*/
Flight::route('POST /destinations', function(){
   $data = Flight::request()->data->getData();
   Flight::json(Flight::destinationService()->create($data));
});

/**
* @OA\Put(
*     path="/destinations/{id}",
*     tags={"destinations"},
*     summary="Update an existing destination by ID",
*     @OA\Parameter(
*         name="id",
*         in="path",
*         required=true,
*         description="Destination ID",
*         @OA\Schema(type="integer", example=1)
*     ),
*     @OA\RequestBody(
*         required=true,
*         @OA\JsonContent(
*             required={"name", "country"},
*             @OA\Property(property="name", type="string", example="Updated Name"),
*             @OA\Property(property="country", type="string", example="Updated Country"),
*             @OA\Property(property="description", type="string", example="Updated description"),
*             @OA\Property(property="badge", type="string", example="Featured")
*         )
*     ),
*     @OA\Response(
*         response=200,
*         description="Destination updated"
*     )
* )
*/
Flight::route('PUT /destinations/@id', function($id){
   $data = Flight::request()->data->getData();
   Flight::json(Flight::destinationService()->update($id, $data));
});

/**
* @OA\Patch(
*     path="/destinations/{id}",
*     tags={"destinations"},
*     summary="Partially update a destination by ID",
*     @OA\Parameter(
*         name="id",
*         in="path",
*         required=true,
*         description="Destination ID",
*         @OA\Schema(type="integer", example=1)
*     ),
*     @OA\RequestBody(
*         required=true,
*         @OA\JsonContent(
*             @OA\Property(property="name", type="string", example="Only name changed"),
*             @OA\Property(property="badge", type="string", example="Premium")
*         )
*     ),
*     @OA\Response(
*         response=200,
*         description="Destination partially updated"
*     )
* )
*/
Flight::route('PATCH /destinations/@id', function($id){
   $data = Flight::request()->data->getData();
   Flight::json(Flight::destinationService()->update($id, $data));
});

/**
* @OA\Delete(
*     path="/destinations/{id}",
*     tags={"destinations"},
*     summary="Delete a destination by ID",
*     @OA\Parameter(
*         name="id",
*         in="path",
*         required=true,
*         description="Destination ID",
*         @OA\Schema(type="integer", example=1)
*     ),
*     @OA\Response(
*         response=200,
*         description="Destination deleted"
*     )
* )
*/
Flight::route('DELETE /destinations/@id', function($id){
   Flight::json(Flight::destinationService()->delete($id));
});
?>