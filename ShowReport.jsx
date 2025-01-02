import React, { useState } from "react";
import {
  Table,
  Navbar,
  Sidebar,
  Button,
  Modal,
  Spinner,
  Select,
  Card,
  Dropdown,
} from "flowbite-react";
import { HiMenu, HiDocumentDownload, HiMail, HiCheck } from "react-icons/hi";
import { FaChevronDown, FaChevronUp, FaUserPlus, FaHotel } from "react-icons/fa";

function ShowReport() {
  const [reports, setReports] = useState([
    {
      id: 1,
      HotelName: "77 Bangla Hotel",
      GeneratedTime: "2025-01-02T13:28:00",
      verified_by: "",
      monthly_report_emails: ["guestasy@example.com"],
      pdf_link: "#",
      emails_sent: [],
    },
    {
      id: 2,
      HotelName: "77 Patong Hotel & Spa",
      GeneratedTime: "2025-01-02T13:28:00",
      verified_by: "",
      monthly_report_emails: ["guestasy@example.com"],
      pdf_link: "#",
      emails_sent: [],
    },
  ]);

  const [selectedMonth, setSelectedMonth] = useState("2024-12");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [isWarningModalOpen, setIsWarningModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentReport, setCurrentReport] = useState(null);
  const [currentEmails, setCurrentEmails] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState({});

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  const handleSendMail = (report) => {
    setCurrentReport(report);
    if (report.emails_sent.length > 0) {
      setIsWarningModalOpen(true);
    } else {
      sendMail(report);
    }
  };

  const sendMail = async (report) => {
    setIsModalOpen(true);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const updatedReports = reports.map((r) =>
        r.id === report.id
          ? {
              ...r,
              emails_sent: [
                ...r.emails_sent,
                { triggered_on: new Date().toISOString() },
              ],
            }
          : r
      );
      setReports(updatedReports);
      setIsModalOpen(false); // Close the modal after sending
    }, 2000);
  };

  const toggleDropdown = (menu) => {
    setIsDropdownOpen((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
      <Sidebar
        aria-label="Navigation sidebar"
        className="w-64 bg-white text-gray-800 border-r-2 border-gray-200"
      >
        <Sidebar.Logo href="#" img="/path-to-logo.png" imgAlt="Guestasy Logo">
          Guestasy
        </Sidebar.Logo>
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            {/* Reports Section */}
            <div>
              <Sidebar.Item
                className="flex items-center justify-between hover:bg-gray-200"
                onClick={() => toggleDropdown("reports")}
              >
                <span>Reports</span>
                {isDropdownOpen.reports ? (
                  <FaChevronUp className="ml-auto" />
                ) : (
                  <FaChevronDown className="ml-auto" />
                )}
              </Sidebar.Item>
              {isDropdownOpen.reports && (
                <div className="pl-4">
                  <Sidebar.Item href="#" className="flex items-center hover:bg-gray-100">
                    <FaHotel className="mr-2" />
                    By Property
                  </Sidebar.Item>
                  <Sidebar.Item href="#" className="flex items-center hover:bg-gray-100">
                    <FaHotel className="mr-2" />
                    All Properties
                  </Sidebar.Item>
                </div>
              )}
            </div>

            {/* Reviews Section */}
            <div>
              <Sidebar.Item
                className="flex items-center justify-between hover:bg-gray-200"
                onClick={() => toggleDropdown("reviews")}
              >
                <span>Reviews</span>
                {isDropdownOpen.reviews ? (
                  <FaChevronUp className="ml-auto" />
                ) : (
                  <FaChevronDown className="ml-auto" />
                )}
              </Sidebar.Item>
              {isDropdownOpen.reviews && (
                <div className="pl-4">
                  <Sidebar.Item href="#" className="flex items-center hover:bg-gray-100">
                    <HiDocumentDownload className="mr-2" />
                    Search
                  </Sidebar.Item>
                  <Sidebar.Item href="#" className="flex items-center hover:bg-gray-100">
                    <HiDocumentDownload className="mr-2" />
                    Download
                  </Sidebar.Item>
                </div>
              )}
            </div>

            {/* Timelines Section */}
            <div>
              <Sidebar.Item
                className="flex items-center justify-between hover:bg-gray-200"
                onClick={() => toggleDropdown("timelines")}
              >
                <span>Timelines</span>
                {isDropdownOpen.timelines ? (
                  <FaChevronUp className="ml-auto" />
                ) : (
                  <FaChevronDown className="ml-auto" />
                )}
              </Sidebar.Item>
              {isDropdownOpen.timelines && (
                <div className="pl-4">
                  <Sidebar.Item href="#" className="flex items-center hover:bg-gray-100">
                    <HiCheck className="mr-2" />
                    Approver
                  </Sidebar.Item>
                  <Sidebar.Item href="#" className="flex items-center hover:bg-gray-100">
                    <HiCheck className="mr-2" />
                    Responder
                  </Sidebar.Item>
                </div>
              )}
            </div>

            {/* Users Section */}
            <div>
              <Sidebar.Item
                className="flex items-center justify-between hover:bg-gray-200"
                onClick={() => toggleDropdown("users")}
              >
                <span>Users</span>
                {isDropdownOpen.users ? (
                  <FaChevronUp className="ml-auto" />
                ) : (
                  <FaChevronDown className="ml-auto" />
                )}
              </Sidebar.Item>
              {isDropdownOpen.users && (
                <div className="pl-4">
                  <Sidebar.Item href="#" className="flex items-center hover:bg-gray-100">
                    <FaUserPlus className="mr-2" />
                    Add User
                  </Sidebar.Item>
                  <Sidebar.Item href="#" className="flex items-center hover:bg-gray-100">
                    <FaUserPlus className="mr-2" />
                    Search User
                  </Sidebar.Item>
                  <Sidebar.Item href="#" className="flex items-center hover:bg-gray-100">
                    <FaHotel className="mr-2" />
                    Search Hotel
                  </Sidebar.Item>
                </div>
              )}
            </div>

            <Sidebar.Item href="#" className="hover:bg-gray-200">
              Settings
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <Card className="mb-6">
          <h1 className="text-3xl font-bold">All Reports</h1>
        </Card>

        <Card className="mb-4 p-6">
          <div className="flex items-center">
            <label className="mr-2 text-lg font-medium">Month:</label>
            <Select
              id="months"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="max-w-xs border-gray-300 bg-white"
            >
              <option value="2024-12">December 2024</option>
              <option value="2024-11">November 2024</option>
              <option value="2024-10">October 2024</option>
            </Select>
          </div>
        </Card>

        <Card className="p-6">
          <Table className="rounded-lg border border-gray-200">
            <Table.Head className="bg-gray-800 text-white">
              <Table.HeadCell>No</Table.HeadCell>
              <Table.HeadCell>Hotel Name</Table.HeadCell>
              <Table.HeadCell>Generated Time</Table.HeadCell>
              <Table.HeadCell>Email Sent</Table.HeadCell>
              <Table.HeadCell>Verified By</Table.HeadCell>
              <Table.HeadCell>Monthly Report Emails</Table.HeadCell>
              <Table.HeadCell>Download</Table.HeadCell>
              <Table.HeadCell>Action</Table.HeadCell>
              <Table.HeadCell>Last Sent</Table.HeadCell>
            </Table.Head>

            <Table.Body>
              {reports.map((report, index) => (
                <Table.Row key={report.id}>
                  <Table.Cell>{index + 1}</Table.Cell>
                  <Table.Cell>{report.HotelName}</Table.Cell>
                  <Table.Cell>{formatDateTime(report.GeneratedTime)}</Table.Cell>
                  <Table.Cell>
                    {report.emails_sent.length > 0 ? "Yes" : "No"}
                  </Table.Cell>
                  <Table.Cell>{report.verified_by}</Table.Cell>
                  <Table.Cell>
                    {report.monthly_report_emails.join(", ")}
                  </Table.Cell>
                  <Table.Cell>
                    <a href={report.pdf_link} download>
                      <HiDocumentDownload className="text-xl" />
                    </a>
                  </Table.Cell>
                  <Table.Cell>
                    <Button
                      onClick={() => handleSendMail(report)}
                      color="light"
                      className="bg-blue-500 text-white"
                    >
                      <HiMail className="mr-2" />
                      Send Mail
                    </Button>
                  </Table.Cell>
                  <Table.Cell>
                    {report.emails_sent.length > 0
                      ? formatDateTime(
                          report.emails_sent[report.emails_sent.length - 1]
                            .triggered_on
                        )
                      : "N/A"}
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Card>
      </div>

      {/* Modals */}
      <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Modal.Body>
          <div className="flex justify-center items-center">
            <Spinner color="gray" size="xl" />
          </div>
          <p className="text-center mt-4">Sending report...</p>
        </Modal.Body>
      </Modal>

      <Modal show={isEmailModalOpen} onClose={() => setIsEmailModalOpen(false)}>
        <Modal.Body>
          <div>
            <h3 className="text-xl font-bold">Send Report</h3>
            <p className="mt-2">Are you sure you want to send this report?</p>
            <div className="mt-4">
              <Button onClick={() => sendMail(currentReport)} className="mr-2">
                Send
              </Button>
              <Button
                color="gray"
                onClick={() => setIsEmailModalOpen(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <Modal
        show={isWarningModalOpen}
        onClose={() => setIsWarningModalOpen(false)}
      >
        <Modal.Body>
          <div>
            <h3 className="text-xl font-bold">Warning</h3>
            <p className="mt-2">
              This report has already been sent. Are you sure you want to send
              it again?
            </p>
            <div className="mt-4">
              <Button onClick={() => sendMail(currentReport)} className="mr-2">
                Yes, Send Again
              </Button>
              <Button
                color="gray"
                onClick={() => setIsWarningModalOpen(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default ShowReport;
