<?php
/**
* @OA\Get(
*      path="/reviews",
*      tags={"reviews"},
*      summary="Get all reviews",
*      @OA\Parameter(
*          name="user_id",
*          in="query",
*          required=false,
*          @OA\Schema(type="integer"),
*          description="Optional user_id to filter reviews"
*      ),
*      @OA\Response(
*           response=200,
*           description="Array of all reviews in the database"
*      )
* )
*/
Flight::route('GET /reviews', function(){
   $user_id = Flight::request()->query['user_id'] ?? null;
   if ($user_id) {
       Flight::json(Flight::reviewService()->getByUserId($user_id));
   } else {
       Flight::json(Flight::reviewService()->getAll());
   }
});

/**
* @OA\Get(
*     path="/reviews/{id}",
*     tags={"reviews"},
*     summary="Get review by ID",
*     @OA\Parameter(
*         name="id",
*         in="path",
*         required=true,
*         description="ID of the review",
*         @OA\Schema(type="integer", example=1)
*     ),
*     @OA\Response(
*         response=200,
*         description="Returns the review with the given ID"
*     )
* )
*/
Flight::route('GET /reviews/@id', function($id){
   Flight::json(Flight::reviewService()->getById($id));
});

/**
* @OA\Post(
*     path="/reviews",
*     tags={"reviews"},
*     summary="Add a new review",
*     @OA\RequestBody(
*         required=true,
*         @OA\JsonContent(
*             required={"user_id", "package_id", "rating"},
*             @OA\Property(property="user_id", type="integer", example=1),
*             @OA\Property(property="package_id", type="integer", example=1),
*             @OA\Property(property="rating", type="integer", example=5),
*             @OA\Property(property="comment", type="string", example="Amazing experience!"),
*             @OA\Property(property="review_date", type="string", format="date", example="2025-11-14")
*         )
*     ),
*     @OA\Response(
*         response=200,
*         description="New review created"
*     )
* )
*/
Flight::route('POST /reviews', function(){
   $data = Flight::request()->data->getData();
   Flight::json(Flight::reviewService()->create($data));
});

/**
* @OA\Put(
*     path="/reviews/{id}",
*     tags={"reviews"},
*     summary="Update an existing review by ID",
*     @OA\Parameter(
*         name="id",
*         in="path",
*         required=true,
*         description="Review ID",
*         @OA\Schema(type="integer", example=1)
*     ),
*     @OA\RequestBody(
*         required=true,
*         @OA\JsonContent(
*             required={"user_id", "package_id", "rating"},
*             @OA\Property(property="user_id", type="integer", example=1),
*             @OA\Property(property="package_id", type="integer", example=1),
*             @OA\Property(property="rating", type="integer", example=4),
*             @OA\Property(property="comment", type="string", example="Updated review comment")
*         )
*     ),
*     @OA\Response(
*         response=200,
*         description="Review updated"
*     )
* )
*/
Flight::route('PUT /reviews/@id', function($id){
   $data = Flight::request()->data->getData();
   Flight::json(Flight::reviewService()->update($id, $data));
});

/**
* @OA\Patch(
*     path="/reviews/{id}",
*     tags={"reviews"},
*     summary="Partially update a review by ID",
*     @OA\Parameter(
*         name="id",
*         in="path",
*         required=true,
*         description="Review ID",
*         @OA\Schema(type="integer", example=1)
*     ),
*     @OA\RequestBody(
*         required=true,
*         @OA\JsonContent(
*             @OA\Property(property="rating", type="integer", example=5),
*             @OA\Property(property="comment", type="string", example="Updated comment only")
*         )
*     ),
*     @OA\Response(
*         response=200,
*         description="Review partially updated"
*     )
* )
*/
Flight::route('PATCH /reviews/@id', function($id){
   $data = Flight::request()->data->getData();
   Flight::json(Flight::reviewService()->update($id, $data));
});

/**
* @OA\Delete(
*     path="/reviews/{id}",
*     tags={"reviews"},
*     summary="Delete a review by ID",
*     @OA\Parameter(
*         name="id",
*         in="path",
*         required=true,
*         description="Review ID",
*         @OA\Schema(type="integer", example=1)
*     ),
*     @OA\Response(
*         response=200,
*         description="Review deleted"
*     )
* )
*/
Flight::route('DELETE /reviews/@id', function($id){
   Flight::json(Flight::reviewService()->delete($id));
});
?>