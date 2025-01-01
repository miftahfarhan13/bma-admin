import { SimpleGrid } from "@chakra-ui/react";
import React from "react";
import CarDocumentImage from "./CarDocumentImage";

export default function CarDocumentImages({
  carDocument,
}: {
  carDocument: any;
}) {
  return (
    <SimpleGrid columns={[2, 2, 4, 4]} gap="10px">
      {carDocument?.bpkb_pict && (
        <CarDocumentImage title="BPKB" imageUrl={carDocument?.bpkb_pict} />
      )}
      {carDocument?.stnk_pict && (
        <CarDocumentImage title="STNK" imageUrl={carDocument?.stnk_pict} />
      )}
      {carDocument?.invoice_pict && (
        <CarDocumentImage
          title="Faktur"
          imageUrl={carDocument?.invoice_pict}
        />
      )}
      {carDocument?.vin_pict && (
        <CarDocumentImage title="NIK/VIN" imageUrl={carDocument?.vin_pict} />
      )}
      {carDocument?.form_a_pict && (
        <CarDocumentImage
          title="Form A (CBU)"
          imageUrl={carDocument?.form_a_pict}
        />
      )}
      {carDocument?.stnk_fotocopy_pict && (
        <CarDocumentImage
          title="FC an STNK"
          imageUrl={carDocument?.stnk_fotocopy_pict}
        />
      )}
      {carDocument?.manual_book_pict && (
        <CarDocumentImage
          title="Buku Manual"
          imageUrl={carDocument?.manual_book_pict}
        />
      )}
      {carDocument?.service_book_pict && (
        <CarDocumentImage
          title="Buku Servis"
          imageUrl={carDocument?.service_book_pict}
        />
      )}
      {carDocument?.backup_key_pict && (
        <CarDocumentImage
          title="Kunci Cadangan"
          imageUrl={carDocument?.backup_key_pict}
        />
      )}
      {carDocument?.receipt_form_pict && (
        <CarDocumentImage
          title="Blanko Kwitansi"
          imageUrl={carDocument?.receipt_form_pict}
        />
      )}
      {carDocument?.declaration_right_pict && (
        <CarDocumentImage
          title="SPH"
          imageUrl={carDocument?.declaration_right_pict}
        />
      )}
      {carDocument?.toolkit_pict && (
        <CarDocumentImage
          title="Toolkits"
          imageUrl={carDocument?.toolkit_pict}
        />
      )}
    </SimpleGrid>
  );
}
