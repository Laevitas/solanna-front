import React, { useState, useEffect } from 'react';
import {
  Card,
  Table,
  Stack,
  Grid,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer
} from '@material-ui/core';
import { AppNewUsers, AppItemOrders, AppWeeklySales } from '../components/_dashboard/app';
// material
// components
import Page from '../components/Page';
import Scrollbar from '../components/Scrollbar';
//

// ----------------------------------------------------------------------

export default function User() {
  const [token, setToken] = useState('So11111111111111111111111111111111111111112');
  const [posts, setPost] = useState([]);
  const RAYDIUM = '4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R';
  const SOLANNA = 'So11111111111111111111111111111111111111112';
  const SERUM = 'SRMuApVNdxXokk5GT7XD5cUUgXMBCoAz2LHeuAoKWRt';
  //---------------------------------------------------------------------
  useEffect(() => {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const raw = JSON.stringify({
      jsonrpc: '2.0',
      id: 1,
      method: 'getTokenLargestAccounts',
      params: [token]
    });

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch('https://api.mainnet-beta.solana.com', requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setPost(result.result.value);
      })
      .catch((error) => console.log('error', error));
  }, [token]);
  const handleClick = (t) => {
    setToken(t);
    console.log(t);
  };
  return (
    <Page title="Top Accounts">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Top Accounts
          </Typography>
        </Stack>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3} onClick={() => handleClick(SERUM)}>
            <AppWeeklySales />
          </Grid>
          <Grid item xs={12} sm={6} md={3} onClick={() => handleClick(RAYDIUM)}>
            <AppNewUsers />
          </Grid>
          <Grid item xs={12} sm={6} md={3} onClick={() => handleClick(SOLANNA)}>
            <AppItemOrders />
          </Grid>
        </Grid>

        <Card>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row" padding="5px">
                      Address
                    </TableCell>
                    <TableCell component="th" scope="row" padding="5px">
                      Amount
                    </TableCell>
                    <TableCell component="th" scope="row" padding="5px">
                      Decimals
                    </TableCell>
                    <TableCell component="th" scope="row" padding="5px">
                      uiAmount
                    </TableCell>
                  </TableRow>

                  {posts.map((post) => (
                    <TableRow>
                      <TableCell component="th" scope="row" padding="3px">
                        <Stack direction="row" alignItems="center" spacing={2}>
                          <Typography variant="subtitle2" noWrap>
                            {post.address}
                          </Typography>
                        </Stack>
                      </TableCell>
                      <TableCell align="left">{post.amount}</TableCell>
                      <TableCell align="left">{post.decimals}</TableCell>

                      <TableCell align="right">{post.uiAmount} </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableBody>
                  <TableRow>
                    <TableCell align="center" colSpan={6} sx={{ py: 3 }} />
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>
        </Card>
      </Container>
    </Page>
  );
}
