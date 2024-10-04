import useGetDealerPerformanceDetail from "@/utils/hooks/dashboard/useGetDealerPerformanceDetail";
import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Spinner,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import moment from "moment";
import React from "react";

export default function ModalDetailPerformanceViewBid({
  data,
  dealer,
}: {
  data: any;
  dealer: any;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const id = dealer?.id;
  const today = new Date();
  const date = moment(today).format("YYYY-MM-DD");
  const { data: detail, isLoading } = useGetDealerPerformanceDetail({
    id,
    date,
    isOpen,
  });
  return (
    <>
      <Tr cursor="pointer" onClick={onOpen}>
        <Td>{dealer?.name}</Td>
        <Td>{dealer?.businesses ? dealer?.businesses[0]?.name : ""}</Td>
        <Td isNumeric>
          {dealer?.latest_seen_cars_sum_seen}/{data?.total_view} (
          {Math.floor(dealer?.percentage_seen)}%)
        </Td>
        <Td isNumeric>
          {dealer?.bids_count}/{data?.total_bid} (
          {Math.floor(dealer?.percentage_bid)}%)
        </Td>
      </Tr>

      <Modal size="3xl" isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody p="20px" position="relative">
            {isLoading && (
              <Box position="absolute" right="20px" top="20px">
                <Spinner />
              </Box>
            )}

            <Stack direction="column" spacing="20px">
              <Stack direction="column" spacing="5px">
                <Text>
                  <Text as="span" fontWeight="700">
                    Dealer
                  </Text>{" "}
                  : {dealer.name}
                </Text>
                <Text>
                  <Text as="span" fontWeight="700">
                    BD
                  </Text>{" "}
                  : {dealer?.businesses ? dealer?.businesses[0]?.name : ""}
                </Text>
                <Text>
                  <Text as="span" fontWeight="700">
                    Date
                  </Text>{" "}
                  : {moment(today).format('DD MMMM YYYY')}
                </Text>
                <Text>
                  <Text as="span" fontWeight="700">
                    Session
                  </Text>{" "}
                  : 10:00 - 15:00
                </Text>
              </Stack>

              <Box p="10px" borderRadius="8px" border="1px solid #DBDBDB">
                <TableContainer>
                  <Table variant="simple">
                    <Thead>
                      <Tr>
                        <Th>ID</Th>
                        <Th>Car</Th>
                        <Th isNumeric>Views</Th>
                        <Th isNumeric>Bids</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {detail && detail[0] && (
                        <>
                          {detail[0]?.cars?.map((car: any) => (
                            <Tr key={car?.id}>
                              <Td>{car?.id}</Td>
                              <Td>{car?.car_name}</Td>
                              <Td isNumeric>
                                {car?.latest_seen_sum_seen || 0}
                              </Td>
                              <Td isNumeric>{car?.bid_count || 0}</Td>
                            </Tr>
                          ))}
                        </>
                      )}
                    </Tbody>
                  </Table>
                </TableContainer>
              </Box>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button variant="primary-solid-medium" onClick={onClose}>
              Done
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
