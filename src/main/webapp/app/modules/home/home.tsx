import React from 'react';
import { Card, CardBody, CardHeader, Col, Container, Jumbotron, Row, Spinner } from 'reactstrap';
import { fetchScore } from '../../shared/util/api-utils';
import './home.scss';

interface IState {
  amountGoodies?: number;
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

  fetchData = () => {
    fetchScore()
      .then(payload => {
        this.setState({
          amountGoodies: payload.goodiesNotTaken,
          co2Saved: payload.co2Saved,
          loading: false,
          plasticSaved: Math.round(Math.random() * 10),
          totalMoney: payload.amountEuroGiven
        });

        this.timer = setTimeout(this.fetchData, 5000);
      })
      .catch(console.error);
  };

  render() {
    const { amountGoodies, co2Saved, loading, plasticSaved, totalMoney } = this.state;

    return (
      <Container>
        <Row>
          <Col sm="12" md={{ size: 6, offset: 3 }}>
            <Card className="main-figures">
              {loading ? (
                <Spinner className="main-figures__loading" color="success" />
              ) : (
                <>
                  <CardHeader>
                    <h2 className="main-figures__title">{amountGoodies} goodies not given so far!</h2>
                  </CardHeader>
                  <CardBody>
                    <Row>
                      <Col md="5">
                        <div className="amount amount--big">
                          {totalMoney} <span>€</span>
                        </div>
                        <div>collected so far</div>
                      </Col>
                      <Col className="main-figures__details">
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
                      </Col>
                    </Row>
                  </CardBody>
                </>
              )}
            </Card>
          </Col>
        </Row>

        <Jumbotron className="what">
          <h1 className="display-4">Goodies no more!</h1>
          <p className="lead">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi non sem et erat scelerisque elementum. Morbi viverra sapien a
            augue eleifend finibus.
          </p>
          <hr className="my-4" />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi non sem et erat scelerisque elementum. Morbi viverra sapien a
            augue eleifend finibus.
          </p>
          <p className="lead">
            <a className="btn btn-primary btn-lg" href="#" role="button">
              Learn more
            </a>
          </p>
        </Jumbotron>
      </Container>
    );
  }
}
