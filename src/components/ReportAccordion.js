import React from 'react'
import {Accordion} from 'react-bootstrap';
function ReportAccordion({name,children}) {
  return (
    <>
    {/* report */}
    <Accordion>
      <Accordion.Item eventKey="0" className=' w-100 rounded-2 shadow mb-3 border-0 '>
        <Accordion.Header className="shadow rounded-2"><span className='fw-medium'>{name}</span></Accordion.Header>
        <Accordion.Body>
          {children} 
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
    </>
  )
}

export default ReportAccordion