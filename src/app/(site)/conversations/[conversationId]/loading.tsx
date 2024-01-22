import { Container, Grid } from "@radix-ui/themes";
import React from "react";

function ConversationLoadingPage() {
  return (
    <Container>
      <Grid align="center" justify="center" width="100%" height="100%">
        <div>Loading...</div>
      </Grid>
    </Container>
  );
}

export default ConversationLoadingPage;
