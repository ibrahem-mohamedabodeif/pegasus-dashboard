import supabase from "./supabase";

export async function getOrders() {
  const { data: orders, error } = await supabase.from("orders").select("*");

  if (error) {
    console.log("can not get data of orders");
  }

  return orders;
}

export async function updateOrderStatus(id, status) {
  const { data, error } = await supabase
    .from("orders")
    .update({ status })
    .eq("id", id)
    .select();

  if (error) {
    console.log("can not updated");
  }

  return data;
}
