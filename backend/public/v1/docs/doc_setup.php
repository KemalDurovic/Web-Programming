<?php
/**
* @OA\Info(
*     title="TravelTrust API",
*     description="Travel Agency API",
*     version="1.0.0",
*     @OA\Contact(
*         email="kemal.durovic@stu.ibu.edu.ba",
*         name="Kemal Durovic"
*     )
* )
*/
/**
 * @OA\Server(
 *     url="http://localhost/kemal_durovic/web-programming/backend",
 *     description="Local Development Server"
 * )
 * @OA\Server(
 *     url="https://b-mysql-fra1-63088-do-user-31107839-0.l.db.ondigitalocean.com/backend",
 *     description="DigitalOcean Production Server"
 * )
 */
/**
* @OA\SecurityScheme(
*     securityScheme="ApiKey",
*     type="apiKey",
*     in="header",
*     name="Authentication"
* )
*/
