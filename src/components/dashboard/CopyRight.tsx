import React from 'react';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';


const CopyRight = (props: any) => {
  return (
    <Typography variant='body2' color='text.secundary' align='center' {...props}>
        {'CopyRight ©'}
        <Link color='inherit' href='https://github.com/cristiangar14/'>
            Cristian's Repo
        </Link>
        {new Date().getFullYear()}
    </Typography>
  )
}

export default CopyRight