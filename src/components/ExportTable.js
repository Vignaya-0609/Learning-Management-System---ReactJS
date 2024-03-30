import React, { useEffect, useState } from 'react';
import { Container, Row, Col, InputGroup, FormControl, Button, Table } from 'react-bootstrap';
import { CSVLink } from 'react-csv';
import { useDispatch, useSelector } from 'react-redux';
import { getReportFromJson } from '../slices/ReportSlice';

const ExportableTable = ({ courseId }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const dispatch = useDispatch();
  const report = useSelector((state) => state.report.reportList);

  useEffect(() => {
    dispatch(getReportFromJson());
  }, [dispatch]);

  useEffect(() => {
    // Filter report data based on courseId
    if (courseId) {
      const filteredByCourseId = report.filter((item) => item.courseId === courseId);
      setOriginalData(filteredByCourseId);
      setFilteredData(filteredByCourseId);
    } else {
      setOriginalData(report);
      setFilteredData(report);
    }
  }, [courseId, report]);

  const headers = [
    { label: 'S.No', key: 'id' },
    { label: 'Student Name', key: 'name' },
    { label: 'Start Date', key: 'startDate' },
    { label: 'Completion', key: 'completion' },
    { label: 'Badge', key: 'badge' },
  ];

  // export as csv
  const handleExportCSV = () => {
    document.getElementById('csvLink').click();
  };

  const handleSearch = (e) => {
    const input = e.target.value;
    setSearchTerm(input);
    const filtered = originalData.filter((item) =>
      item.name.toLowerCase().includes(input.toLowerCase())
    );
    setFilteredData(filtered);
  };

  return (
    <Container className="table-responsive p-3">
      <Row className="mb-3 d-flex">
        <Col md={8}>
          <InputGroup>
            <FormControl
              type="text"
              id="searchInput"
              placeholder="Search"
              className="mb-3 w-100 p-1"
              value={searchTerm}
              onChange={handleSearch}
            />
          </InputGroup>
        </Col>
        <Col md={4}>
          <Button variant="" className="w-100 p-1 btn-color" onClick={handleExportCSV}>
            Export as CSV
          </Button>
          <CSVLink
            data={filteredData}
            headers={headers}
            filename="exported_data.csv"
            id="csvLink"
          />
        </Col>
      </Row>
      <Table bordered striped id="myTable1">
        {/* Table header */}
        <thead>
          <tr>
            <th>S.No</th>
            <th>Student Name</th>
            <th>Start Date</th>
            <th>Completion</th>
            <th>Badge</th>
          </tr>
        </thead>
        {/* Table body */}
        <tbody>
          {filteredData.map((item,index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.startDate}</td>
              <td>{item.completion}</td>
              <td>{item.badge}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default ExportableTable;
