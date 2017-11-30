import React, { Component } from 'react';
import { Table, Checkbox, Container, Divider, Dropdown, Header, Image, List, Menu, Segment  } from 'semantic-ui-react'
import moment from 'moment'

import Endpoint from './Endpoint.js'


import './App.css';

class App extends Component {

  state = {
    logset: [],
  }

  getData() {
    fetch('/v1/logs/').then(response => {
      var contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        return response.json();
      }
      throw new TypeError("Oops, we haven't got JSON!");
    }).then(json => {
      let logset = json.logset.map(endpoint => ({
          endpoint: endpoint.endpoint,
          logs: endpoint.logs.map(entry => (
            {
              ip: entry.ip,
              timestamp: entry.timestamp,
              nativeTimestamp: moment(entry.timestamp * 1000),
            }
          )),
          aggregates: this.aggregates(endpoint.logs),
        })
      )
      console.log(logset)
      this.setState({logset: logset})
    }).catch(error => {
      console.log(error);
    })
  }

  componentDidMount() {
    this.getData()
  }

  aggregates(entries) {
    console.log(entries)
    var ret = {}
    entries.map(entry => {
      let toMinute = moment(entry.timestamp * 1000).format('MM/DD/YY HH:mm')
      if (ret[toMinute] === undefined) {
        ret[toMinute] = {}
      }
      if (ret[toMinute][entry.ip] === undefined) {
        ret[toMinute][entry.ip] = 0
      }
      ret[toMinute][entry.ip] += 1
    })
    return ret
  }

  render() {
    return (
      <div>
        <Menu fixed='top' inverted>
          <Container>
            <Menu.Item as='a' header>
              Loggish
            </Menu.Item>
            <Menu.Item as='a'>Home</Menu.Item>
          </Container>
        </Menu>
        <Segment
          vertical
          style={{ margin: '0em 0em 0em', padding: '5em 0em' }}
        >
          <Container textAlign='center'>
            {this.state.logset.map(log =>
              <Endpoint key={log.endpoint} {...log} />
            )}
          </Container>
        </Segment>
      </div>
    )
  }
}

export default App;
