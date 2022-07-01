import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { CenteredFlexBox, FullSizeCenteredFlexBox } from '@/components/styled';

function NotFound() {
  return (
    <Container sx={{ height: '100%' }}>
      <FullSizeCenteredFlexBox flexDirection="column">
        <CenteredFlexBox flexDirection="column">
          <Typography sx={{ mt: 2 }} variant="h4" color="error">
            404 Not Found
          </Typography>
        </CenteredFlexBox>
      </FullSizeCenteredFlexBox>
    </Container>
  );
}

export default NotFound;
