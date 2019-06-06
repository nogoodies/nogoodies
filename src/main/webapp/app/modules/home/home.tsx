import React from 'react';
import { Card, CardBody, CardHeader, Col, Container, Row, Spinner } from 'reactstrap';
import './home.scss';

interface IState {
  co2Saved?: number;
  loading: boolean;
  plasticSaved?: number;
  totalMoney?: number;
}

export default class Home extends React.Component<{}, IState> {
  mounted = false;
  timer: NodeJS.Timeout;
  state: IState = { loading: true };

  componentDidMount() {
    this.mounted = true;
    this.fetchData();
  }

  componentWillUnmount() {
    this.mounted = false;
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

  fetchData() {
    setTimeout(() => {
      Promise.resolve({
        totalEur: 100,
        plastic: 20,
        co2: 33
      }).then(payload => {
        this.setState({
          co2Saved: payload.co2,
          loading: false,
          plasticSaved: payload.plastic,
          totalMoney: payload.totalEur
        });

        this.timer = setTimeout(this.fetchData, 5000);
      });
    }, 2000);
  }

  render() {
    const { co2Saved, loading, plasticSaved, totalMoney } = this.state;

    return (
      <>
        <Row>
          <Col sm="12" md={{ size: 4, offset: 4 }}>
            <Card className="main-figures">
              {loading ? (
                <Spinner className="main-figures__loading" color="success" />
              ) : (
                <>
                  <CardHeader>
                    <h2 className="main-figures__title">Saved so far!</h2>
                  </CardHeader>
                  <CardBody>
                    <Row>
                      <Col md="5">
                        <div className="amount amount--big">
                          {totalMoney} <span>€</span>
                        </div>
                        <div>collected so far</div>
                      </Col>
                      <Col>
                        <Container className="main-figures__details">
                          <Row>
                            <Col>
                              <span className="amount">{co2Saved}</span>Kg of CO<sup>2</sup>
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <span className="amount">{plasticSaved}</span>Kg of plastic
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <span className="amount">0</span>Baby whales choked to death
                            </Col>
                          </Row>
                        </Container>
                      </Col>
                    </Row>
                  </CardBody>
                </>
              )}
            </Card>
          </Col>
        </Row>
      </>
    );
  }
}
