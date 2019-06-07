import React from 'react';
import { Card, CardBody, CardHeader, Col, Container, Jumbotron, Row, Spinner } from 'reactstrap';
import { fetchScore, fetchTweets, ITweetsPayload } from '../../shared/util/api-utils';
import { TwitterTweetEmbed } from 'react-twitter-embed';
import './home.scss';

interface IState {
  amountGoodies?: number;
  co2Saved?: number;
  loading: boolean;
  plasticSaved?: number;
  waterSaved?: number;
  electricitySaved?: number;
  totalMoney?: number;
  tweets?: ITweetsPayload;
}

export default class Home extends React.Component<{}, IState> {
  mounted = false;
  timer: NodeJS.Timeout;
  state: IState = { loading: true, tweets: [] };

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
          co2Saved: Math.floor(payload.co2Saved * 2.89),
          loading: false,
          plasticSaved: Math.floor(payload.goodiesNotTaken * 30),
          waterSaved: Math.floor(payload.goodiesNotTaken * 187),
          electricitySaved: Math.floor(payload.goodiesNotTaken * 8.79),
          totalMoney: payload.amountEuroGiven
        });

        this.timer = setTimeout(this.fetchData, 1000);
      })
      .catch(console.error);

    fetchTweets()
      .then(payload => {
        this.setState({
          tweets: payload
        });
      })
      .catch(console.error);
  };

  render() {
    const { amountGoodies, co2Saved, loading, plasticSaved, waterSaved, electricitySaved, totalMoney } = this.state;

    const tweets = this.state.tweets.map(item => <TwitterTweetEmbed tweetId={item.tweetId} key={item.tweetId} className="col-sm-3" />);

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
                    <h2 className="main-figures__title">{amountGoodies} t-shirts not given so far!</h2>
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
                            <span className="amount">{plasticSaved}</span>g of plastic
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <span className="amount">{waterSaved}</span>L of water
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <span className="amount">{electricitySaved}</span>kWh of energy
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

        <Row>{tweets}</Row>
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
