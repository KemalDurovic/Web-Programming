<?php
/**
* @OA\Get(
*      path="/users",
*      tags={"users"},
*      summary="Get all users",
*      @OA\Parameter(
*          name="email",
*          in="query",
*          required=false,
*          @OA\Schema(type="string"),
*          description="Optional email to filter users"
*      ),
*      @OA\Response(
*           response=200,
*           description="Array of all users in the database"
*      )
* )
*/
Flight::route('GET /users', function(){
   $email = Flight::request()->query['email'] ?? null;
   if ($email) {
       Flight::json(Flight::userService()->getByEmail($email));
   } else {
       Flight::json(Flight::userService()->getAll());
   }
});

/**
* @OA\Get(
*     path="/users/{id}",
*     tags={"users"},
*     summary="Get user by ID",
*     @OA\Parameter(
*         name="id",
*         in="path",
*         required=true,
*         description="ID of the user",
*         @OA\Schema(type="integer", example=1)
*     ),
*     @OA\Response(
*         response=200,
*         description="Returns the user with the given ID"
*     )
* )
*/
Flight::route('GET /users/@id', function($id){
   Flight::json(Flight::userService()->getById($id));
});

/**
* @OA\Post(
*     path="/users",
*     tags={"users"},
*     summary="Add a new user",
*     @OA\RequestBody(
*         required=true,
*         @OA\JsonContent(
*             required={"username", "email", "password"},
*             @OA\Property(property="username", type="string", example="john_doe"),
*             @OA\Property(property="email", type="string", example="john@example.com"),
*             @OA\Property(property="password", type="string", example="securePassword123"),
*             @OA\Property(property="full_name", type="string", example="John Doe"),
*             @OA\Property(property="phone", type="string", example="+1234567890"),
*             @OA\Property(property="role", type="string", example="user")
*         )
*     ),
*     @OA\Response(
*         response=200,
*         description="New user created"
*     )
* )
*/
Flight::route('POST /users', function(){
   $data = Flight::request()->data->getData();
   Flight::json(Flight::userService()->create($data));
});

/**
* @OA\Put(
*     path="/users/{id}",
*     tags={"users"},
*     summary="Update an existing user by ID",
*     @OA\Parameter(
*         name="id",
*         in="path",
*         required=true,
*         description="User ID",
*         @OA\Schema(type="integer", example=1)
*     ),
*     @OA\RequestBody(
*         required=true,
*         @OA\JsonContent(
*             required={"username", "email"},
*             @OA\Property(property="username", type="string", example="john_updated"),
*             @OA\Property(property="email", type="string", example="john.updated@example.com"),
*             @OA\Property(property="full_name", type="string", example="John Updated"),
*             @OA\Property(property="phone", type="string", example="+9876543210")
*         )
*     ),
*     @OA\Response(
*         response=200,
*         description="User updated"
*     )
* )
*/
Flight::route('PUT /users/@id', function($id){
   $data = Flight::request()->data->getData();
   Flight::json(Flight::userService()->update($id, $data));
});

/**
* @OA\Patch(
*     path="/users/{id}",
*     tags={"users"},
*     summary="Partially update a user by ID",
*     @OA\Parameter(
*         name="id",
*         in="path",
*         required=true,
*         description="User ID",
*         @OA\Schema(type="integer", example=1)
*     ),
*     @OA\RequestBody(
*         required=true,
*         @OA\JsonContent(
*             @OA\Property(property="phone", type="string", example="+1234567890"),
*             @OA\Property(property="full_name", type="string", example="John Partial Update")
*         )
*     ),
*     @OA\Response(
*         response=200,
*         description="User partially updated"
*     )
* )
*/
Flight::route('PATCH /users/@id', function($id){
   $data = Flight::request()->data->getData();
   Flight::json(Flight::userService()->update($id, $data));
});

/**
* @OA\Delete(
*     path="/users/{id}",
*     tags={"users"},
*     summary="Delete a user by ID",
*     @OA\Parameter(
*         name="id",
*         in="path",
*         required=true,
*         description="User ID",
*         @OA\Schema(type="integer", example=1)
*     ),
*     @OA\Response(
*         response=200,
*         description="User deleted"
*     )
* )
*/
Flight::route('DELETE /users/@id', function($id){
   Flight::json(Flight::userService()->delete($id));
});
?>