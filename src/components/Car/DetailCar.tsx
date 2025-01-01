import { formatter } from "@/utils/number";
import {
  AccordionItem,
  Center,
  Flex,
  SimpleGrid,
  TabPanel,
  TabPanels,
  Tab,
  TabList,
  Tabs,
  Text,
  Accordion,
  AccordionButton,
  AccordionPanel,
  BreadcrumbLink,
  Breadcrumb,
  BreadcrumbItem,
  Td,
  Table,
  Tr,
  Tbody,
  Tag,
} from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import { Stack } from "@chakra-ui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import moment from "moment";
import React from "react";
import PhotoGalery from "../AppComponents/PhotoGallery";
import CarDamageImage from "./CarDamageImage";
import CarChecklistDocument from "./CarChecklistDocument";
import CarDocumentImages from "./CarDocumentImages";

export default function DetailCar({ car }: { car: any }) {
  const price = car?.created_price ? car?.created_price : car?.price;
  return (
    <>
      <Stack direction="column" gap="20px">
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink href="/car">List Car</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink href="#" color="red">
              Detail Car
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>

        <Stack direction={["column", "column", "row", "row"]} gap="20px">
          <Box w={["100%", "100%", "40%", "40%"]}>
            <PhotoGalery images={car?.car_images} />
          </Box>
          <Box w={["100%", "100%", "60%", "60%"]}>
            <Stack direction="column" gap="20px">
              <Flex direction="column" alignItems="start">
                <Text
                  fontWeight="700"
                  fontSize={["20px", "20px", "24px", "24px"]}
                >
                  {car?.brand?.brand_name} {car?.car_name}
                </Text>
                <Text
                  fontWeight="700"
                  fontSize={["28px", "28px", "36px", "36px"]}
                  color="#ED1C29"
                  mb="10px"
                >
                  Rp {formatter.format(price)}
                </Text>
                <Stack direction="row" alignItems="center" gap="10px">
                  <Tag colorScheme={car?.status === "Terjual" ? "green" : car?.status === "Lelang Ulang" ? "orange" : "gray"}>
                    {car?.status}
                  </Tag>
                  <Tag variant="outline" colorScheme="red">
                    {car?.car_availability}
                  </Tag>
                  <Tag variant="outline" colorScheme="red">
                    <Icon icon="mdi:eye-outline" /> &nbsp;&nbsp;
                    {car?.latest_seen_sum_seen}
                  </Tag>
                  <Tag variant="outline" colorScheme="red">
                    <Icon icon="streamline:justice-hammer" />
                    &nbsp;&nbsp;
                    {car?.bid_count}
                  </Tag>
                </Stack>
              </Flex>

              {car?.defect_status !== "Tidak Ada" && (
                <Center
                  bgColor="#ffedd54d"
                  borderRadius="99px"
                  px="10px"
                  py="5px"
                  color="rgb(234 88 12 / 1)"
                  alignSelf="start"
                >
                  <Stack direction="row" alignItems="center" fontSize="12px">
                    <Icon icon="fa6-solid:car-burst" />
                    <Text>Tabrak {car?.defect_status}</Text>
                  </Stack>
                </Center>
              )}

              <SimpleGrid columns={[1, 1, 2, 2]} gap="10px">
                <Table border="none">
                  <Tbody>
                    <Tr>
                      <Td p="10px" fontWeight="700">
                        Harga Open
                      </Td>
                      <Td p="10px" isNumeric>
                        Rp {formatter.format(car?.price)}
                      </Td>
                    </Tr>
                    <Tr>
                      <Td p="10px" fontWeight="700">
                        Harga Buy Now
                      </Td>
                      <Td p="10px" isNumeric>
                        Rp {formatter.format(car?.current_price)}
                      </Td>
                    </Tr>
                    <Tr>
                      <Td p="10px" fontWeight="700">
                        Status Tabrakan
                      </Td>
                      <Td p="10px" isNumeric>
                        {car?.defect_status}
                      </Td>
                    </Tr>
                    <Tr>
                      <Td p="10px" fontWeight="700">
                        Status Banjir
                      </Td>
                      <Td p="10px" isNumeric>
                        {car?.is_flooded ? "Ya" : "Tidak"}
                      </Td>
                    </Tr>
                    <Tr>
                      <Td p="10px" fontWeight="700">
                        Tanggal Dimulai
                      </Td>
                      <Td p="10px" isNumeric>
                        {car?.session_time_start}
                      </Td>
                    </Tr>
                    <Tr>
                      <Td p="10px" fontWeight="700">
                        Tanggal Berakhir
                      </Td>
                      <Td p="10px" isNumeric>
                        {car?.session_time_end}
                      </Td>
                    </Tr>
                  </Tbody>
                </Table>
                <Table border="none">
                  <Tbody>
                    <Tr>
                      <Td p="10px" fontWeight="700">
                        Plat Nomor
                      </Td>
                      <Td p="10px" isNumeric>
                        {car?.license_plate}
                      </Td>
                    </Tr>
                    <Tr>
                      <Td p="10px" fontWeight="700">
                        Tahun Mobil
                      </Td>
                      <Td p="10px" isNumeric>
                        {moment(new Date(car?.manufacture_year)).format("YYYY")}
                      </Td>
                    </Tr>
                    <Tr>
                      <Td p="10px" fontWeight="700">
                        Pajak Mobil
                      </Td>
                      <Td p="10px" isNumeric>
                        {moment(new Date(car?.car_tax)).format("MMM YYYY")}
                      </Td>
                    </Tr>
                    <Tr>
                      <Td p="10px" fontWeight="700">
                        Kilometer
                      </Td>
                      <Td p="10px" isNumeric>
                        {formatter.format(car?.odometer)} km
                      </Td>
                    </Tr>
                    <Tr>
                      <Td p="10px" fontWeight="700">
                        Bahan Bakar
                      </Td>
                      <Td p="10px" isNumeric>
                        {car?.fuel_type}
                      </Td>
                    </Tr>
                    <Tr>
                      <Td p="10px" fontWeight="700">
                        Transmisi
                      </Td>
                      <Td p="10px" isNumeric>
                        {car?.transmission_type}
                      </Td>
                    </Tr>
                  </Tbody>
                </Table>
              </SimpleGrid>
            </Stack>
          </Box>
        </Stack>

        <Tabs colorScheme="red">
          <TabList>
            <Tab>
              <Icon icon="icon-park-outline:inspection" /> &nbsp; Laporan
              Inspeksi
            </Tab>
            <Tab>
              <Icon icon="ri:file-damage-line" />
              &nbsp; Kerusakan Mobil
            </Tab>
            <Tab>
              <Icon icon="solar:document-linear" /> &nbsp; Kelengkapan Dokumen
            </Tab>
            <Tab>
              <Icon icon="solar:document-linear" /> &nbsp;Foto Dokumen
            </Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <div
                dangerouslySetInnerHTML={{
                  __html: car?.inspection_detail,
                }}
              ></div>
            </TabPanel>
            <TabPanel>
              <Accordion allowToggle>
                <AccordionItem
                  border="2px solid #f4f4f5"
                  borderRadius="8px"
                  mb="10px"
                >
                  <AccordionButton>
                    <Icon icon="iconoir:tools"></Icon> &nbsp; Kerusakan Interior
                  </AccordionButton>
                  <AccordionPanel py="10px">
                    <SimpleGrid columns={[2, 2, 4, 4]} gap="10px">
                      {car?.car_defects_interior?.map(
                        (interior: any, index: number) => (
                          <CarDamageImage
                            key={`interior-${index}`}
                            imageUrl={interior?.defect_pict}
                            title={interior?.defect_title}
                          />
                        )
                      )}
                    </SimpleGrid>
                  </AccordionPanel>
                </AccordionItem>
                <AccordionItem
                  border="2px solid #f4f4f5"
                  borderRadius="8px"
                  mb="10px"
                >
                  <AccordionButton>
                    <Icon icon="iconoir:tools"></Icon> &nbsp; Kerusakan
                    Eksterior
                  </AccordionButton>
                  <AccordionPanel py="10px">
                    <SimpleGrid columns={[2, 2, 4, 4]} gap="10px">
                      {car?.car_defects_eksterior?.map(
                        (eksterior: any, index: number) => (
                          <CarDamageImage
                            key={`eksterior-${index}`}
                            imageUrl={eksterior?.defect_pict}
                            title={eksterior?.defect_title}
                          />
                        )
                      )}
                    </SimpleGrid>
                  </AccordionPanel>
                </AccordionItem>
                <AccordionItem
                  border="2px solid #f4f4f5"
                  borderRadius="8px"
                  mb="10px"
                >
                  <AccordionButton>
                    <Icon icon="iconoir:tools"></Icon> &nbsp; Others
                  </AccordionButton>
                  <AccordionPanel py="10px">
                    <SimpleGrid columns={[2, 2, 4, 4]} gap="10px">
                      {car?.car_defects_others?.map(
                        (other: any, index: number) => (
                          <CarDamageImage
                            key={`other-${index}`}
                            imageUrl={other?.defect_pict}
                            title={other?.defect_title}
                          />
                        )
                      )}
                    </SimpleGrid>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </TabPanel>
            <TabPanel>
              <CarChecklistDocument carDocument={car?.car_document} />
            </TabPanel>
            <TabPanel>
              <CarDocumentImages carDocument={car?.car_document} />
            </TabPanel>
          </TabPanels>
        </Tabs>
        {/* <Tabs.Root defaultValue="damages" variant="enclosed" hidden>
          <Tabs.List
            p="5px"
            whiteSpace="nowrap"
            flexDir={["column", "column", "row", "row"]}
            w="100%"
          >
            <Tabs.Trigger
              value="inspection"
              px="20px"
              py="10px"
              bgColor="white"
            >
              <Icon icon="icon-park-outline:inspection" />
              Laporan Inspeksi
            </Tabs.Trigger>
            <Tabs.Trigger value="damages" px="20px" py="10px" bgColor="white">
              <Icon icon="ri:file-damage-line" />
              Kerusakan Mobil
            </Tabs.Trigger>
            <Tabs.Trigger value="documents" px="20px" py="10px" bgColor="white">
              <Icon icon="solar:document-linear" />
              Kelengkapan Dokumen
            </Tabs.Trigger>
            <Tabs.Trigger
              value="documents-pictures"
              px="20px"
              py="10px"
              bgColor="white"
            >
              <Icon icon="solar:document-linear" />
              Foto Dokumen
            </Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="inspection" py="20px">
            <div
              dangerouslySetInnerHTML={{
                __html: car?.inspection_detail,
              }}
            ></div>
          </Tabs.Content>
          <Tabs.Content value="damages" py="20px">
            <AccordionRoot collapsible>
              <AccordionItem
                value="Interior"
                p="10px"
                border="2px solid #f4f4f5"
                borderRadius="8px"
                mb="10px"
              >
                <AccordionItemTrigger>
                  <Icon icon="iconoir:tools"></Icon>
                  Kerusakan Interior
                </AccordionItemTrigger>
                <AccordionItemContent py="10px">
                  <SimpleGrid columns={[2, 2, 4, 4]} gap="10px">
                    {car?.car_defects_interior?.map(
                      (interior: any, index: number) => (
                        <CarDamageImage
                          key={`interior-${index}`}
                          imageUrl={interior?.defect_pict}
                          title={interior?.defect_title}
                        />
                      )
                    )}
                  </SimpleGrid>
                </AccordionItemContent>
              </AccordionItem>
              <AccordionItem
                value="Eksterior"
                p="10px"
                border="2px solid #f4f4f5"
                borderRadius="8px"
                mb="10px"
              >
                <AccordionItemTrigger>
                  <Icon icon="iconoir:tools"></Icon>
                  Kerusakan Eksterior
                </AccordionItemTrigger>
                <AccordionItemContent py="10px">
                  <SimpleGrid columns={[2, 2, 4, 4]} gap="10px">
                    {car?.car_defects_eksterior?.map(
                      (eksterior: any, index: number) => (
                        <CarDamageImage
                          key={`eksterior-${index}`}
                          imageUrl={eksterior?.defect_pict}
                          title={eksterior?.defect_title}
                        />
                      )
                    )}
                  </SimpleGrid>
                </AccordionItemContent>
              </AccordionItem>
              <AccordionItem
                value="Others"
                p="10px"
                border="2px solid #f4f4f5"
                borderRadius="8px"
                mb="10px"
              >
                <AccordionItemTrigger>
                  <Icon icon="iconoir:tools"></Icon>
                  Others
                </AccordionItemTrigger>
                <AccordionItemContent py="10px">
                  <SimpleGrid columns={[2, 2, 4, 4]} gap="10px">
                    {car?.car_defects_others?.map(
                      (other: any, index: number) => (
                        <CarDamageImage
                          key={`other-${index}`}
                          imageUrl={other?.defect_pict}
                          title={other?.defect_title}
                        />
                      )
                    )}
                  </SimpleGrid>
                </AccordionItemContent>
              </AccordionItem>
            </AccordionRoot>
          </Tabs.Content>
          <Tabs.Content value="documents" py="20px">
            <CarChecklistDocument
              carDocument={car?.car_document}
            />
          </Tabs.Content>
          <Tabs.Content value="documents-pictures" py="20px">
            <CarDocumentImages carDocument={car?.car_document} />
          </Tabs.Content>
        </Tabs.Root> */}
      </Stack>
    </>
  );
}
