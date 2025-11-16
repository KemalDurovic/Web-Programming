<?php
/**
* @OA\Get(
*      path="/bookings",
*      tags={"bookings"},
*      summary="Get all bookings",
*      @OA\Parameter(
*          name="user_id",
*          in="query",
*          required=false,
*          @OA\Schema(type="integer"),
*          description="Optional user_id to filter bookings"
*      ),
*      @OA\Response(
*           response=200,
*           description="Array of all bookings in the database"
*      )
* )
*/
Flight::route('GET /bookings', function(){
   $user_id = Flight::request()->query['user_id'] ?? null;
   if ($user_id) {
       Flight::json(Flight::bookingService()->getByUserId($user_id));
   } else {
       Flight::json(Flight::bookingService()->getAll());
   }
});

/**
* @OA\Get(
*     path="/bookings/{id}",
*     tags={"bookings"},
*     summary="Get booking by ID",
*     @OA\Parameter(
*         name="id",
*         in="path",
*         required=true,
*         description="ID of the booking",
*         @OA\Schema(type="integer", example=1)
*     ),
*     @OA\Response(
*         response=200,
*         description="Returns the booking with the given ID"
*     )
* )
*/
Flight::route('GET /bookings/@id', function($id){
   Flight::json(Flight::bookingService()->getById($id));
});

/**
* @OA\Post(
*     path="/bookings",
*     tags={"bookings"},
*     summary="Add a new booking",
*     @OA\RequestBody(
*         required=true,
*         @OA\JsonContent(
*             required={"user_id", "package_id", "booking_date"},
*             @OA\Property(property="user_id", type="integer", example=1),
*             @OA\Property(property="package_id", type="integer", example=1),
*             @OA\Property(property="booking_date", type="string", format="date", example="2025-12-01"),
*             @OA\Property(property="number_of_people", type="integer", example=2),
*             @OA\Property(property="total_price", type="number", format="float", example=1500.00),
*             @OA\Property(property="status", type="string", example="pending")
*         )
*     ),
*     @OA\Response(
*         response=200,
*         description="New booking created"
*     )
* )
*/
Flight::route('POST /bookings', function(){
   $data = Flight::request()->data->getData();
   Flight::json(Flight::bookingService()->create($data));
});

/**
* @OA\Put(
*     path="/bookings/{id}",
*     tags={"bookings"},
*     summary="Update an existing booking by ID",
*     @OA\Parameter(
*         name="id",
*         in="path",
*         required=true,
*         description="Booking ID",
*         @OA\Schema(type="integer", example=1)
*     ),
*     @OA\RequestBody(
*         required=true,
*         @OA\JsonContent(
*             required={"user_id", "package_id", "booking_date"},
*             @OA\Property(property="user_id", type="integer", example=1),
*             @OA\Property(property="package_id", type="integer", example=1),
*             @OA\Property(property="booking_date", type="string", format="date", example="2025-12-01"),
*             @OA\Property(property="number_of_people", type="integer", example=3),
*             @OA\Property(property="total_price", type="number", format="float", example=2000.00),
*             @OA\Property(property="status", type="string", example="confirmed")
*         )
*     ),
*     @OA\Response(
*         response=200,
*         description="Booking updated"
*     )
* )
*/
Flight::route('PUT /bookings/@id', function($id){
   $data = Flight::request()->data->getData();
   Flight::json(Flight::bookingService()->update($id, $data));
});

/**
* @OA\Patch(
*     path="/bookings/{id}",
*     tags={"bookings"},
*     summary="Partially update a booking by ID",
*     @OA\Parameter(
*         name="id",
*         in="path",
*         required=true,
*         description="Booking ID",
*         @OA\Schema(type="integer", example=1)
*     ),
*     @OA\RequestBody(
*         required=true,
*         @OA\JsonContent(
*             @OA\Property(property="status", type="string", example="confirmed"),
*             @OA\Property(property="number_of_people", type="integer", example=3),
*             @OA\Property(property="total_price", type="number", format="float", example=2000.00)
*         )
*     ),
*     @OA\Response(
*         response=200,
*         description="Booking partially updated"
*     )
* )
*/
Flight::route('PATCH /bookings/@id', function($id){
   $data = Flight::request()->data->getData();
   Flight::json(Flight::bookingService()->update($id, $data));
});

/**
* @OA\Delete(
*     path="/bookings/{id}",
*     tags={"bookings"},
*     summary="Delete a booking by ID",
*     @OA\Parameter(
*         name="id",
*         in="path",
*         required=true,
*         description="Booking ID",
*         @OA\Schema(type="integer", example=1)
*     ),
*     @OA\Response(
*         response=200,
*         description="Booking deleted"
*     )
* )
*/
Flight::route('DELETE /bookings/@id', function($id){
   Flight::json(Flight::bookingService()->delete($id));
});
?>