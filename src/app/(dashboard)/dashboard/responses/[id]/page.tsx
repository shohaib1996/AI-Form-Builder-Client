

import ResponseTable from '@/components/response/ResponseTable'
import React from 'react'


const ResponsesPage = async({ params }: {params: Promise<{ id: string }>}) => {
  const { id } = await params

  return (
    <div>
      <ResponseTable id={id} />
    </div>
  )
}

export default ResponsesPage
