import supabase, { supabaseUrl } from "./supabase";

export async function getProducts() {
  const { data, error } = await supabase.from("productes").select("*");

  if (error) {
    console.log(error);
    throw new Error("productes can not loaded");
  }

  return data;
}

export async function deleteProduct(id) {
  const { error } = await supabase.from("productes").delete().eq("id", id);

  if (error) {
    throw new Error("productes can not loaded");
  }
}

export async function newProducte(newProducte) {
  const imageName = `${Math.random()}-${newProducte.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = `${supabaseUrl}/storage/v1/object/public/images/${imageName}`;
  const { data, error } = await supabase
    .from("productes")
    .insert([{ ...newProducte, image: imagePath }])
    .select();

  if (error) {
    throw new Error("productes can not loaded");
  }

  const { error: storageError } = await supabase.storage
    .from("images")
    .upload(imageName, newProducte.image);

  return data;
}

export async function editeProduct(editedProduct, id) {
  let imagePath = editedProduct.image;
  if (
    imagePath &&
    !(typeof imagePath === "string" && imagePath.startsWith(supabaseUrl))
  ) {
    const imageName = `${Math.random()}-${editedProduct.image.name}`.replaceAll(
      "/",
      ""
    );
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("images")
      .upload(imageName, editedProduct.image);

    if (uploadError) {
      throw new Error("Failed to upload image");
    }

    imagePath = `${supabaseUrl}/storage/v1/object/public/images/${imageName}`;
  }

  const { data, error } = await supabase
    .from("productes")
    .update({ ...editedProduct, image: imagePath })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw new Error("Products cannot be updated");
  }

  return data;
}
