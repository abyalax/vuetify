import type { TreeNode } from '@/components/fragments/table/use-tree-table'
import type { Material } from '@/types'
import { IndexedDBRepository } from '@/libs/storage/repository'

const materials: TreeNode<Material>[] = [
  {
    id: '1',
    server: 'BCG',
    group: {
      name: 'MatGroup',
      number: '1000',
      children: [
        {
          name: 'Ext',
          number: '1000-1',
          children: [
            {
              name: 'MatNum',
              number: '140124124',
            },
          ],
        },
      ],
    },
    vendor_direct: 'METRA KREATIVA, PT',
    vendor_aggregator: 'KOPERASI KARYAWAN BINA BERSAMA, PT',
    category: 'GSL',
    sub_category: 'ENVIRO',
  },
]

export class MaterialRepository extends IndexedDBRepository<Material> {
  constructor () {
    super('material-db', 'material')
    this.init()
  }

  async init () {
    if (await this.isEmpty()) {
      this.create(materials)
    }
  }
}
