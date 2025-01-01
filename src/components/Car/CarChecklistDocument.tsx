import { Box, Stack, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";

export default function CarChecklistDocument({
  carDocument,
}: {
  carDocument: any;
}) {
  return (
    <Stack direction="column" gap="10px">
      <Table border="none">
        <Thead>
          <Tr bgColor="#f4f4f5">
            <Th p="10px">Dokumen</Th>
            <Th p="10px">Kelengkapan</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td p="10px">BPKB</Td>
            <Td p="10px">
              {carDocument?.bpkb_status === 1 ? (
                <Box color="green.500">
                  <Icon icon="solar:check-circle-bold" />
                </Box>
              ) : (
                <Box color="red.500">
                  <Icon icon="solar:close-circle-bold" />
                </Box>
              )}
            </Td>
          </Tr>
          <Tr>
            <Td p="10px">STNK</Td>
            <Td p="10px">
              {carDocument?.stnk_status === 1 ? (
                <Box color="green.500">
                  <Icon icon="solar:check-circle-bold" />
                </Box>
              ) : (
                <Box color="red.500">
                  <Icon icon="solar:close-circle-bold" />
                </Box>
              )}
            </Td>
          </Tr>
          <Tr>
            <Td p="10px">Faktur</Td>
            <Td p="10px">
              {carDocument?.invoice_status === 1 ? (
                <Box color="green.500">
                  <Icon icon="solar:check-circle-bold" />
                </Box>
              ) : (
                <Box color="red.500">
                  <Icon icon="solar:close-circle-bold" />
                </Box>
              )}
            </Td>
          </Tr>
          <Tr>
            <Td p="10px">NIK/VIN</Td>
            <Td p="10px">
              {carDocument?.vin_status === 1 ? (
                <Box color="green.500">
                  <Icon icon="solar:check-circle-bold" />
                </Box>
              ) : (
                <Box color="red.500">
                  <Icon icon="solar:close-circle-bold" />
                </Box>
              )}
            </Td>
          </Tr>
          <Tr>
            <Td p="10px">Form A (CBU)</Td>
            <Td p="10px">
              {carDocument?.form_a_status === 1 ? (
                <Box color="green.500">
                  <Icon icon="solar:check-circle-bold" />
                </Box>
              ) : (
                <Box color="red.500">
                  <Icon icon="solar:close-circle-bold" />
                </Box>
              )}
            </Td>
          </Tr>
          <Tr>
            <Td p="10px">FC an STNK</Td>
            <Td p="10px">
              {carDocument?.stnk_fotocopy_status === 1 ? (
                <Box color="green.500">
                  <Icon icon="solar:check-circle-bold" />
                </Box>
              ) : (
                <Box color="red.500">
                  <Icon icon="solar:close-circle-bold" />
                </Box>
              )}
            </Td>
          </Tr>
          <Tr>
            <Td p="10px">Buku Manual</Td>
            <Td p="10px">
              {carDocument?.manual_book_status === 1 ? (
                <Box color="green.500">
                  <Icon icon="solar:check-circle-bold" />
                </Box>
              ) : (
                <Box color="red.500">
                  <Icon icon="solar:close-circle-bold" />
                </Box>
              )}
            </Td>
          </Tr>
          <Tr>
            <Td p="10px">Buku Servis</Td>
            <Td p="10px">
              {carDocument?.service_book_status === 1 ? (
                <Box color="green.500">
                  <Icon icon="solar:check-circle-bold" />
                </Box>
              ) : (
                <Box color="red.500">
                  <Icon icon="solar:close-circle-bold" />
                </Box>
              )}
            </Td>
          </Tr>
          <Tr>
            <Td p="10px">Kunci Cadangan</Td>
            <Td p="10px">
              {carDocument?.backup_key_status === 1 ? (
                <Box color="green.500">
                  <Icon icon="solar:check-circle-bold" />
                </Box>
              ) : (
                <Box color="red.500">
                  <Icon icon="solar:close-circle-bold" />
                </Box>
              )}
            </Td>
          </Tr>
          <Tr>
            <Td p="10px">Blanko Kwitansi</Td>
            <Td p="10px">
              {carDocument?.receipt_form_status === 1 ? (
                <Box color="green.500">
                  <Icon icon="solar:check-circle-bold" />
                </Box>
              ) : (
                <Box color="red.500">
                  <Icon icon="solar:close-circle-bold" />
                </Box>
              )}
            </Td>
          </Tr>
          <Tr>
            <Td p="10px">SPH</Td>
            <Td p="10px">
              {carDocument?.declaration_right_status === 1 ? (
                <Box color="green.500">
                  <Icon icon="solar:check-circle-bold" />
                </Box>
              ) : (
                <Box color="red.500">
                  <Icon icon="solar:close-circle-bold" />
                </Box>
              )}
            </Td>
          </Tr>
          <Tr>
            <Td p="10px">Toolkits</Td>
            <Td p="10px">
              {carDocument?.toolkit_status === 1 ? (
                <Box color="green.500">
                  <Icon icon="solar:check-circle-bold" />
                </Box>
              ) : (
                <Box color="red.500">
                  <Icon icon="solar:close-circle-bold" />
                </Box>
              )}
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </Stack>
  );
}
