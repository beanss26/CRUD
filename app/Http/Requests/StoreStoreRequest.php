<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreStoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'product_name' => 'required|string|unique:stores,product_name|max:255',  // Validate product name
            'product_quantity' => 'required|integer|min:1',  // Validate product quantity
            'product_price' => 'required|numeric|min:0.01',  // Validate product price
            'created_by' => 'required',
        ];
    }
}
