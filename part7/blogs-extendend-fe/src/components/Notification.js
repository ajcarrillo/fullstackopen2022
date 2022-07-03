import { Alert, Container, Row, Col } from "react-bootstrap"
import PropTypes from "prop-types"

const Notification = ({ message, type }) => {
  return (
    <Container>
      <Row>
        <Col>
          <Alert variant={type}>{message}</Alert>
        </Col>
      </Row>
    </Container>
  )
}

Notification.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
}

export default Notification
