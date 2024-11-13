<?php

namespace App\Http\Controllers;

use App\Models\Store;
use Inertia\Inertia;
use App\Http\Requests\StoreStoreRequest;
use App\Http\Requests\UpdateStoreRequest;
use App\Http\Resources\StoreResource;
use Illuminate\Http\Request;

class StoreController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $model = Store::query()
            ->where('product_name', 'like', '%'.request()->query('search').'%')
            // Removed 'product_description' field as it doesn't exist
            ->orderBy(
                request('sort_field', 'created_at'),
                request('sort_direction', 'desc')
            )
            ->paginate(5)
            ->appends(request()->query());

        return Inertia::render('Stores/Index', [
            'model' => StoreResource::collection($model),
            'queryParams' => request()->query(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Stores/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreStoreRequest $request)
    {
        Store::create($request->validated());

        session()->flash('message', 'Successfully created a new product');

        return redirect(route('stores.index'));
    }

    /**
     * Display the specified resource.
     */
    public function show(Store $store)
    {
        $store = Store::with('createdBy')->findOrFail($store->id);
        
        return Inertia::render('Stores/Show', [
            'store' => new StoreResource($store)
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Store $store)
    {
        return Inertia::render('Stores/Edit', [
            'store' => new StoreResource($store)
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $product_id)
{
    // Find the store by product_id
    $store = Store::find($product_id);

    // Check if the store exists
    if (!$store) {
        return response()->json(['error' => 'Store not found'], 404);
    }

    // Update the store with new data
    $store->update([
        'product_name' => $request->product_name,
        'product_quantity' => $request->product_quantity,
        'product_price' => $request->product_price,
    ]);

    // Flash success message to the session
    session()->flash('message', 'Successfully updated the product');

    // Redirect or return a response
    return redirect(route('stores.index'));
}


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Store $store)
    {
        $store->delete();

        session()->flash('message', 'Successfully deleted the product');

        return redirect(route('stores.index'));
    }
}
