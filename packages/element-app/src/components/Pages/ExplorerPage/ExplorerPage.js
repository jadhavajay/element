import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Typography, Grid, LinearProgress } from '@material-ui/core';

import { Pages } from '../../index';

import { SidetreeTransaction } from '../../SidetreeTransaction';

export class ExplorerPage extends Component {
  componentWillMount() {
    const searchParams = new URLSearchParams(window.location.search);
    const since = searchParams.get('since');
    const transactionTimeHash = searchParams.get('transaction-time-hash');
    if (since && transactionTimeHash) {
      this.props.getSidetreeTransactions({ since, transactionTimeHash });
    } else {
      this.props.getSidetreeTransactions();
    }
  }

  render() {
    const { nodeStore } = this.props;
    const { sidetreeTxns } = nodeStore;
    return (
      <Pages.WithNavigation>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <Typography variant="h3" style={{ marginBottom: '8px' }}>
              Element Explorer
              {/* TODO: add menu for filtering. */}
              {/* eslint-disable-next-line */}
              {/* ?since=36&transaction-time-hash=0x5e496d4d60b2abd6326ec64298ba9be0bfbb89b5d804f5383381ebb65e8aaf8f */}
            </Typography>
          </Grid>

          {!sidetreeTxns ? (
            <Grid item xs={12}>
              <LinearProgress color="primary" variant="query" />
            </Grid>
          ) : (
            sidetreeTxns.map(transaction => (
              <Grid item xs={12} key={transaction.transactionNumber}>
                <SidetreeTransaction
                  transaction={transaction}
                  blockchain={'Ethereum'}
                  network={'ropsten'}
                  onClickTransactionTimeHash={(transactionTimeHash) => {
                    this.props.history.push(`/server/transactions/${transactionTimeHash}`);
                  }}
                />
              </Grid>
            ))
          )}
        </Grid>
      </Pages.WithNavigation>
    );
  }
}

ExplorerPage.propTypes = {
  nodeStore: PropTypes.object.isRequired,
  getSidetreeTransactions: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};