import React, { useState } from "react";
import { useForm } from "@inertiajs/react";

export default function Buy({ model, onDialogConfig }) {
    const { data, setData, post, processing, errors } = useForm({
        quantity: 1,
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route("stores.buy", model.product_id), {
            onSuccess: () => {
                alert("Purchase successful!");
                onDialogConfig(null);
            },
            onError: () => {
                alert("An error occurred. Please try again.");
            },
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label
                    htmlFor="quantity"
                    className="block text-sm font-medium text-gray-700"
                >
                    Quantity
                </label>
                <input
                    type="number"
                    id="quantity"
                    value={data.quantity}
                    onChange={(e) => setData("quantity", e.target.value)}
                    min="1"
                    max={model.product_quantity}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-black"
                />
                {errors.quantity && (
                    <p className="text-red-500 text-sm mt-1">{errors.quantity}</p>
                )}
            </div>

            <div className="mt-4">
                <button
                    type="submit"
                    disabled={processing}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    {processing ? "Processing..." : "Buy"}
                </button>
            </div>
        </form>
    );
}
