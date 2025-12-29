<?php
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

Flight::group('/auth', function() {
   /**
    * @OA\Post(
    *     path="/auth/register",
    *     summary="Register new user.",
    *     description="Add a new user to the database.",
    *     tags={"auth"},
    *     security={
    *         {"ApiKey": {}}
    *     },
    *     @OA\RequestBody(
    *         description="Add new user",
    *         required=true,
    *         @OA\MediaType(
    *             mediaType="application/json",
    *             @OA\Schema(
    *                 required={"password", "email"},
    *                 @OA\Property(
    *                     property="password",
    *                     type="string",
    *                     example="some_password",
    *                     description="User password"
    *                 ),
    *                 @OA\Property(
    *                     property="email",
    *                     type="string",
    *                     example="demo@gmail.com",
    *                     description="User email"
    *                 )
    *             )
    *         )
    *     ),
    *     @OA\Response(
    *         response=200,
    *         description="User has been added."
    *     ),
    *     @OA\Response(
    *         response=500,
    *         description="Internal server error."
    *     )
    * )
    */
   Flight::route("POST /register", function () {
       try {
           $data = Flight::request()->data->getData();
           error_log("Register request data: " . json_encode($data));

           $response = Flight::auth_service()->register($data);
      
           if ($response['success']) {
               Flight::json([
                   'message' => 'User registered successfully',
                   'data' => $response['data']
               ], 200);
           } else {
               Flight::json(['error' => $response['error']], 400);
           }
       } catch (Exception $e) {
           error_log("Register route error: " . $e->getMessage());
           Flight::json(['error' => 'Registration failed: ' . $e->getMessage()], 500);
       }
   });

   /**
    * @OA\Post(
    *      path="/auth/login",
    *      tags={"auth"},
    *      summary="Login to system using email and password",
    *      @OA\Response(
    *           response=200,
    *           description="User data and JWT"
    *      ),
    *      @OA\RequestBody(
    *          description="Credentials",
    *          @OA\JsonContent(
    *              required={"email","password"},
    *              @OA\Property(property="email", type="string", example="demo@gmail.com", description="User email address"),
    *              @OA\Property(property="password", type="string", example="some_password", description="User password")
    *          )
    *      )
    * )
    */
   Flight::route('POST /login', function() {
       try {
           $data = Flight::request()->data->getData();
           error_log("Login request received for: " . ($data['email'] ?? 'no email'));

           $response = Flight::auth_service()->login($data);
      
           if ($response['success']) {
               Flight::json([
                   'message' => 'User logged in successfully',
                   'data' => $response['data']
               ], 200);
           } else {
               Flight::json(['error' => $response['error']], 400);
           }
       } catch (Exception $e) {
           error_log("Login route error: " . $e->getMessage());
           error_log("Stack trace: " . $e->getTraceAsString());
           Flight::json(['error' => 'Login failed: ' . $e->getMessage()], 500);
       }
   });

   /**
    * @OA\Post(
    *     path="/auth/reset-password",
    *     summary="Reset user password",
    *     description="Reset password for a user by email",
    *     tags={"auth"},
    *     @OA\RequestBody(
    *         description="Reset password data",
    *         required=true,
    *         @OA\MediaType(
    *             mediaType="application/json",
    *             @OA\Schema(
    *                 required={"email", "new_password"},
    *                 @OA\Property(
    *                     property="email",
    *                     type="string",
    *                     example="demo@gmail.com",
    *                     description="User email"
    *                 ),
    *                 @OA\Property(
    *                     property="new_password",
    *                     type="string",
    *                     example="new_password123",
    *                     description="New password"
    *                 )
    *             )
    *         )
    *     ),
    *     @OA\Response(
    *         response=200,
    *         description="Password reset successfully"
    *     ),
    *     @OA\Response(
    *         response=500,
    *         description="Internal server error"
    *     )
    * )
    */
   Flight::route('POST /reset-password', function() {
       try {
           $data = Flight::request()->data->getData();

           $response = Flight::auth_service()->reset_password($data);

           if ($response['success']) {
               Flight::json([
                   'message' => 'Password reset successfully',
                   'data' => $response
               ], 200);
           } else {
               Flight::json(['error' => $response['error']], 400);
           }
       } catch (Exception $e) {
           error_log("Reset password route error: " . $e->getMessage());
           Flight::json(['error' => 'Password reset failed: ' . $e->getMessage()], 500);
       }
   });
});
?>