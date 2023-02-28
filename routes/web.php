<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;


/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


/*
*   MOCKING API Router
*/

$base_api = "/api/";


// query param ?category=food
Route::get($base_api . 'list-art', function (Request $request) {
    $category = $request->query('category');

    $jsonfile;
    $data;

    if ($category == 'drink')
        $json = Storage::get('public/list-menu/drink.json');
    else if ($category == 'snack')
        $json = Storage::get('public/list-menu/snack.json');
    else
        $json = Storage::get('public/list-art/art.json');     // default or fallback

    $data = json_decode($json, true);
    return response()->json($data);
});

Route::post($base_api . 'order', function (Request $request) {
    $data = $request->all();
    $json = json_encode($data, JSON_PRETTY_PRINT);

    $date_postfix = date('YmdHis');
    $number_postfix = rand(1, 9);
    Storage::put('order/order-' . $date_postfix . '-' . strval($number_postfix) . '.json', $json);
    return response()->json(['status' => 'ok', 'message' => 'order has been saved'], 201);
});

Route::get($base_api . 'order', function () {
    return "use this url with POST method";
});


/*
*   FrontEnd Endpoint
*/

Route::get('/{any?}', function () {
    return view('main');
})->where('any', '.*');
