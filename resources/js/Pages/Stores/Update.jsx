/**
 * teachasgreywolf
 * May 17, 2024
 */

import InputError from "@/Components/InputError";
import LabelEx from "@/Components/LabelEx";
import { Button } from "@/shadcn/ui/button";
import { Input } from "@/shadcn/ui/input";
import { useForm, usePage } from "@inertiajs/react";
import { Loader2 } from "lucide-react";

const Update = ({ model, onDialogConfig, params }) => {
    const { auth } = usePage().props;
    const { data, setData, patch, processing, reset, errors } = useForm({
        product_name: model.product_name ?? "",
        product_quantity: model.product_quantity ?? "",
        product_price: model.product_price ?? "",
        created_by: auth.user.id,
    });

    // Debugging: Log model.id to ensure it's available
    console.log("Store ID:", model);

    const submit = (e) => {
        e.preventDefault();
        
        // Debugging: Check the correct field for the ID
        console.log("Submitting update for store with product_id:", model.product_id);
        
        // Ensure that the store product_id is correctly passed to the route
        if (!model.product_id) {
            console.error("Store product_id is missing!");
            return;  // Exit if model.product_id is not available
        }
        
        // Use the correct field for product_id
        patch(route("stores.update", { store: model.product_id }), {
            onSuccess: () => {
                reset();
                onDialogConfig({
                    open: false,
                    process: "",
                    data: null,
                });
            },
        });
    };
    
    

    return (
        <>
            <form onSubmit={submit}>
                <div className="grid gap-4 mb-7 pt-3">
                    <div className="">
                        <LabelEx htmlFor="product_name" required>Product Name</LabelEx>

                        <Input
                            value={data.product_name}
                            onChange={(e) => setData("product_name", e.target.value)}
                            type="text"
                            className="mt-1 block w-full py-[0.5rem] px-[.75rem] border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 rounded-md shadow-sm"
                        />

                        <InputError message={errors.product_name} className="mt-2" />
                    </div>

                    <div className="">
                        <LabelEx htmlFor="product_quantity" required>Product Quantity</LabelEx>

                        <Input
                            value={data.product_quantity}
                            onChange={(e) => setData("product_quantity", e.target.value)}
                            type="number"
                            min="0"
                            className="mt-1 block w-full py-[0.5rem] px-[.75rem] border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 rounded-md shadow-sm"
                        />

                        <InputError message={errors.product_quantity} className="mt-2" />
                    </div>

                    <div className="">
                        <LabelEx htmlFor="product_price" required>Product Price</LabelEx>

                        <Input
                            value={data.product_price}
                            onChange={(e) => setData("product_price", e.target.value)}
                            type="number"
                            min="0"
                            step="0.01"
                            className="mt-1 block w-full py-[0.5rem] px-[.75rem] border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 rounded-md shadow-sm"
                        />

                        <InputError message={errors.product_price} className="mt-2" />
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex justify-end space-x-3">
                    {processing ? (
                        <Button disabled className="rounded-full w-40">
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Updating...
                        </Button>
                    ) : (
                        <Button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-500 rounded-full w-40"
                        >
                            Save
                        </Button>
                    )}

                    <Button
                        variant="secondary"
                        onClick={() => onDialogConfig({ open: false, process: "", data: null })}
                        className="rounded-full w-40"
                    >
                        Close
                    </Button>
                </div>
            </form>
        </>
    );
};

export default Update;
