# Dynamic Cell Table Documentation

## Overview
Proyek ini bertujuan untuk membuat tabel hierarki dinamis menggunakan Vue 3 dan Vuetify, yang dapat menampilkan data material dengan struktur grup bersarang. Tabel harus mendukung fitur expand/collapse untuk menampilkan atau menyembunyikan level hierarki, dengan perhitungan rowspan dan colspan yang otomatis berdasarkan kedalaman dan status ekspansi node.

Struktur data terdiri dari material yang memiliki properti `group` yang bersarang, di mana setiap grup dapat memiliki children. Tabel harus menampilkan kolom seperti Server, Group (dengan nesting), Group Number, Vendor Direct, dan Vendor Aggregator.

## Current Implementation

### Files Overview

#### 1. `board-table.vue`
- **Path**: `src/pages/playground/dynamic-cell/_components/board-table.vue`
- **Purpose**: Contoh implementasi tabel statis menggunakan Vuetify `v-table` dengan rowspan dan colspan manual untuk menampilkan hierarki grup material.
- **Key Features**:
  - Header dengan 2 baris: Baris pertama untuk kategori utama (Server, Group, Vendor), baris kedua untuk sub-kategori dalam Group.
  - Body dengan rowspan untuk kolom Server dan Group utama, colspan untuk sub-grup.
  - Menggunakan ikon chevron (mdiChevronDown, mdiChevronRight) untuk menunjukkan status expand/collapse, tetapi belum terintegrasi dengan state dinamis.
- **Limitations**:
  - Statis: Tidak ada interaktivitas expand/collapse.
  - Rowspan dan colspan di-hardcode.
  - Tidak dapat menangani data dinamis atau perubahan struktur hierarki.

#### 2. `dfs-algorithm.ts`
- **Path**: `src/pages/playground/dynamic-cell/_hooks/dfs-algorithm.ts`
- **Purpose**: Implementasi algoritma Depth-First Search (DFS) untuk traversal pohon hierarki.
- **Key Features**:
  - `dfsPreOrder`: Traversal pre-order untuk mengunjungi node dan mengumpulkan hasil (misalnya, untuk membangun baris tabel).
  - `dfsPostOrder`: Traversal post-order untuk menghitung akumulasi dari bawah ke atas (misalnya, untuk menghitung rowspan berdasarkan children).
  - Mendukung opsi `getChildren`, `isExpanded`, dan `onVisit` untuk fleksibilitas.
- **Usage**: Digunakan dalam hook `useHierarchicalCellTable` untuk menghitung metadata tabel seperti rowspan dan kedalaman node.

#### 3. `example-dynamic-cell-table.vue`
- **Path**: `src/pages/playground/dynamic-cell/_components/example-dynamic-cell-table.vue`
- **Purpose**: Komponen Vue yang mendemonstrasikan penggunaan hook `useHierarchicalCellTable` untuk membuat tabel dinamis.
- **Key Features**:
  - Menggunakan data contoh `materials` dengan struktur hierarki grup.
  - Render baris berdasarkan `rows` dari hook, dengan rowspan untuk kolom Server dan colspan untuk kolom Group berdasarkan kedalaman.
  - Kolom: Server, Group (dengan colspan dinamis), Group Number, Vendor Direct, Vendor Aggregator.
- **Limitations**:
  - Rowspan dan colspan belum sepenuhnya diimplementasikan dengan benar (komentar: "last work, disini row dan colspan belum implement as well").
  - Tidak ada ikon chevron atau event handler untuk expand/collapse.
  - Struktur rendering masih sederhana dan belum menangani semua kasus hierarki.

#### 4. `use-hierachical-cell-table.ts`
- **Path**: `src/pages/playground/dynamic-cell/_hooks/use-hierachical-cell-table.ts`
- **Purpose**: Hook Vue composable untuk mengelola logika tabel hierarki, termasuk pembangunan pohon, perhitungan metadata, dan state ekspansi.
- **Key Features**:
  - Tipe data: `NestedGroup`, `ExpandedState`, `NodeMeta`, `GroupNode`, `GroupRecord`, `RenderRow`.
  - Fungsi `computeNodeMeta`: Menggunakan DFS post-order untuk menghitung rowspan berdasarkan status ekspansi dan jumlah children.
  - Fungsi `buildGroupTree`: Mengkonversi data input menjadi struktur pohon `GroupNode`.
  - Fungsi `buildRenderRows`: Menggunakan DFS pre-order untuk menghasilkan array `RenderRow` dengan metadata.
  - Composable `useHierarchicalCellTable`: Mengembalikan `rows` (computed), `expanded` (ref), dan `toggle` function.
- **Usage**: Digunakan oleh komponen tabel untuk mendapatkan baris render yang siap ditampilkan.

## Current Problems and Unresolved Issues

1. **Expand/Collapse Functionality**:
   - Tidak ada implementasi interaktif untuk expand/collapse node. Ikon chevron ada di `board-table.vue` tetapi tidak terhubung dengan state.
   - Fungsi `toggle` di hook belum digunakan di komponen.

2. **Rowspan and Colspan Calculation**:
   - Di `example-dynamic-cell-table.vue`, rowspan untuk Server hanya diterapkan jika `depth === 0`, tetapi belum menangani rowspan untuk grup lainnya.
   - Colspan untuk kolom Group dihitung sebagai `4 - row.meta.depth`, tetapi ini mungkin tidak akurat untuk semua level nesting.
   - Perlu recalculate rowspan setiap kali status ekspansi berubah, seperti yang disebutkan di komentar `board-table.vue`.

3. **Rendering Logic**:
   - Tabel belum menampilkan ikon chevron untuk node yang dapat di-expand.
   - Tidak ada handling untuk node yang collapsed (children disembunyikan).
   - Struktur kolom mungkin perlu disesuaikan untuk menampilkan indentasi atau ikon di kolom Group.

4. **Data Structure and Flexibility**:
   - Struktur data `materials` memiliki `group` dengan `children`, tetapi mungkin perlu disesuaikan untuk lebih fleksibel.
   - Tidak ada validasi untuk data input atau handling error.

5. **Performance and Scalability**:
   - Untuk data besar, perhitungan DFS mungkin lambat jika tidak dioptimalkan.
   - Tidak ada virtual scrolling atau pagination.

## Requirements Not Yet Covered

- **Interactive Expand/Collapse**: Tambahkan event handler pada ikon chevron untuk memanggil `toggle(nodeKey)`, dan update rendering berdasarkan `isExpanded`.
- **Accurate Rowspan/Colspan**: Implementasikan logika untuk menghitung dan menerapkan rowspan/colspan yang benar untuk semua kolom berdasarkan hierarki.
- **Visual Indicators**: Tambahkan ikon chevron yang menunjukkan status (expanded/collapsed) dan hanya tampilkan untuk node yang memiliki children.
- **Dynamic Recalculation**: Pastikan metadata seperti rowspan di-recalculate otomatis saat `expanded` state berubah.
- **Styling and UX**: Sesuaikan styling untuk menunjukkan hierarki (misalnya, indentasi), dan tambahkan animasi untuk expand/collapse.
- **Testing and Validation**: Tambahkan unit tests untuk hook dan komponen, serta validasi data input.
- **Integration with Real Data**: Adaptasi untuk data API nyata, bukan hanya contoh statis.

## Next Steps
1. Implementasi expand/collapse di `example-dynamic-cell-table.vue` dengan menambahkan ikon dan event handler.
2. Perbaiki logika rowspan dan colspan berdasarkan `meta.rowspan` dan kedalaman.
3. Update `useHierarchicalCellTable` jika diperlukan untuk mendukung fitur baru.
4. Test dengan data yang lebih kompleks untuk memastikan skalabilitas.
5. Dokumentasi API dan penggunaan hook untuk developer lain.

Dokumentasi ini akan diperbarui seiring perkembangan implementasi.

## Todo
- Adding button with icon chevron to toggle collapse per cell/row
- di bagian ini

  ```ts
  <td :colspan="4 - row.meta.depth">
     {{ row.node.record.name }}
   </td>
  <!-- last work, disini row dan colspan belum implement as well -->
          <td>{{ row.node.record.number }}</td>
          <td>{{ row.data?.vendor_direct }}</td>
          <td>{{ row.data?.vendor_aggregator }}</td>
  ```

  ini belum menerapkan konsep yanng saya mention disini

  ```ts
   <tr>
          <!-- Need State to recalculate again rowspan at here cell -->
          <!-- on every action open/close all cell on the entire table -->
          <td rowspan="6">
            <!-- Need State open/close collapsible for icon -->
            <v-icon :icon="mdiChevronDown" />
          </td>

          <!-- Need State to recalculate again rowspan at here cell -->
          <!-- on every action open/close all cell on the entire table -->
          <td rowspan="6">BCG</td>

          <!-- Merge 4 column untuk parent pertama -->
          <!-- merge berapa column ini didapat dari hitungan berapa jumlah child nya -->
          <!-- tapi untuk sementara hardcode dulu, belum dinamis -->
          <!-- but still scallable if need more nested -->
          <td colspan="4">MatGroup</td>
          <td>1000</td>
          <td>Metra Kreative, PT</td>
          <td>Koperasi Karyawan, PT</td>
        </tr>

        <tr>
          <!-- Instead of skip, render cell kosong -->
          <td colspan="1"><v-icon :icon="mdiChevronDown" /></td>
          <td colspan="1">Ext v1</td>
          <!-- like this, don't use cell with colspan > 1 -->
          <td colspan="1" />
          <td colspan="1" />
          <!-- row based, so child have their row data -->
          <td>1000-1</td>
          <td>Metra Kreative, PT</td>
          <td>Koperasi Karyawan, PT</td>
        </tr>

        <tr>
          <!-- look, disini ada pola di bagian nested nya -->
          <!-- nested child => geser data ke cell sebelahnya dan row bawahnya -->
          <td colspan="1" />
          <td colspan="1"><v-icon :icon="mdiChevronDown" /></td>
          <td colspan="1">Matnum</td>
          <td colspan="1" />

          <!-- row based, so child have their row data -->
          <td colspan="1">1000-1a</td>
          <td colspan="1">Metra Kreative, PT</td>
          <td colspan="1">Koperasi Karyawan, PT</td>
        </tr>
  ```

  pada bagian ini, sebenernya hasilnya sudah bener, tapi di before after nya belum ada cell kosong seperti yang saya temukan polanya di file board-table.vue

  ```ts
  :colspan="4 - row.meta.depth"
  ```
