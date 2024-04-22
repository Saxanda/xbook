import * as React from 'react';

import {Box, Typography, Modal} from '@mui/material';



export default function ModalLogin({title, text, handleClose, open }) {

  return (

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="modal-box">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {title}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {text}
          </Typography>
        </Box>
      </Modal>
  );
}