export const materials = [
  {
    id: 'm-1',
    server: 'BCG',
    vendor_direct: 'Metra Kreative, PT',
    vendor_aggregator: 'Koperasi Karyawan, PT',
    category: 'Material',
    sub_category: 'Raw',
    children: [
      {
        name: 'MatGroup',
        number: '1000',
        data: {
          id: 'm-1a',
          server: 'BCG',
          vendor_direct: 'Mat Kreative, PT',
          vendor_aggregator: 'Koperasi MatGroup, PT',
          category: 'Material',
          sub_category: 'Raw',
        },
        children: [
          {
            name: 'Ext v1',
            number: '1000-1',
            data: {
              id: 'm-1a1',
              server: 'BCG',
              vendor_direct: 'Ekt v1 Kreative, PT',
              vendor_aggregator: 'Koperasi Ekt v1, PT',
              category: 'Material',
              sub_category: 'Raw',
            },
            children: [
              {
                name: 'Matnum',
                number: '1000-1a',
                data: {
                  id: 'm-1a1a',
                  server: 'BCG',
                  vendor_direct: 'Matnum Kreative, PT',
                  vendor_aggregator: 'Koperasi Matnum, PT',
                  category: 'Material',
                  sub_category: 'Raw',
                },
                children: [
                  {
                    name: 'Subs',
                    number: '1000-1a1',
                    data: {
                      id: 'm-1a1a1',
                      server: 'BCG',
                      vendor_direct: 'Subs Kreative, PT',
                      vendor_aggregator: 'Koperasi Subs, PT',
                      category: 'Material',
                      sub_category: 'Raw',
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'm-2',
    server: 'SSH',
    vendor_direct: 'Metra Efisien, PT',
    vendor_aggregator: 'Koperasi Managerial, PT',
    category: 'Jasa',
    sub_category: 'Consultant',
    children: [
      {
        name: 'FanGroup',
        number: '1001',
        data: {
          id: 'm-2a',
          server: 'SSH',
          vendor_direct: 'Fan Efficien, PT',
          vendor_aggregator: 'Koperasi FanGroup, PT',
          category: 'Jasa',
          sub_category: 'Consultant',
        },
        children: [
          {
            name: 'Ext a1',
            number: '1000-1',
            data: {
              id: 'm-2a1',
              server: 'SSH',
              vendor_direct: 'Ekt a1 Kreative, PT',
              vendor_aggregator: 'Koperasi Ekt a1, PT',
              category: 'Jasa',
              sub_category: 'Consultant',
            },
            children: [
              {
                name: 'Matnum',
                number: '1000-1a',
                data: {
                  id: 'm-2a1a',
                  server: 'SSH',
                  vendor_direct: 'Matnum Efficien, PT',
                  vendor_aggregator: 'Koperasi Matnum, PT',
                  category: 'Jasa',
                  sub_category: 'Consultant',
                },
                children: [
                  {
                    name: 'Subs',
                    number: '1000-1a1',
                    data: {
                      id: 'm-2a1a1',
                      server: 'SSH',
                      vendor_direct: 'Subs Efficien, PT',
                      vendor_aggregator: 'Koperasi Subs, PT',
                      category: 'Jasa',
                      sub_category: 'Consultant',
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
]
