import { Box, Skeleton } from '@mui/material'
import React from 'react'

export default function CheapestProductSkeleton() {
  return (
    <Box sx={{ width: 250, margin: 2 }}>
      <Skeleton variant="rectangular" width="100%" height={140} />
      <Skeleton variant="text" width="80%" height={30} sx={{ mt: 1 }} />
      <Skeleton variant="text" width="60%" height={20} />
      <Skeleton variant="text" width="40%" height={25} />
    </Box>
  )
}
