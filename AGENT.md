
# Hiring Apps – Frontend Dummy Project Requirements (Extended Contract)

## 1. Objective

Membangun **dummy frontend project (Proof of Concept)** untuk **Hiring Application** berbasis Vue 3 dengan fokus pada:

- CRUD berbasis mock API
- Form kompleks & dinamis
- Validasi schema-first
- State management & async state yang eksplisit
- Arsitektur domain-oriented (struktur folder tidak dikunci)

Dokumen ini berfungsi sebagai **single source of truth** sebelum masuk ke tahap Vibe Coding.

---

## 2. Tech Stack (Mandatory)

- Vue 3 (Composition API)
- Vite
- Vuetify 3
- Pinia
- @tanstack/vue-query
- vee-validate
- Zod
- Axios (mock abstraction)

Constraints:
- Tidak menggunakan Options API
- Fokus implementasi PoC yang clean dan realistis

---

## 3. Domain Scope (CRUD)

Aplikasi memiliki 3 domain utama:

1. Candidate
2. CV Management
3. Job Post

Setiap domain memiliki:
- List
- Detail
- Create
- Update
- Delete

Semua data berasal dari **mock API (in-memory)**.

---

## 4. Domain Contract (Entity Types)

### 4.1 Candidate

```ts
export type CandidateStatus =
  | "active"
  | "inactive"
  | "blacklisted";

export interface Candidate {
  id: string;
  fullName: string;
  email: string;
  phoneNumbers: string[];
  location?: string;
  status: CandidateStatus;

  createdAt: string;
  updatedAt: string;
}
```

### 4.2 CV Management

```ts
export type EmploymentType =
  | "full-time"
  | "part-time"
  | "contract"
  | "internship";

export interface CVExperience {
  companyName: string;
  position: string;
  startDate: string;
  endDate?: string;
  description?: string;
}

export interface CVEducation {
  institution: string;
  degree: string;
  startYear: number;
  endYear?: number;
}

export interface CV {
  id: string;
  candidateId: string;

  title: string;
  summary?: string;

  skills: string[];
  experiences: CVExperience[];
  educations: CVEducation[];

  expectedSalary?: number;
  preferredEmploymentType?: EmploymentType;

  createdAt: string;
  updatedAt: string;
}
```

---

### 4.3 Job Post

```ts
export type JobStatus =
  | "draft"
  | "published"
  | "closed";

export interface JobPost {
  id: string;

  title: string;
  department?: string;
  location: string;

  description: string;
  requirements: string[];
  responsibilities?: string[];

  employmentType: EmploymentType;
  salaryRange?: {
    min: number;
    max: number;
  };

  status: JobStatus;

  createdAt: string;
  updatedAt: string;
}
```

---

## 5. Zod Schema Contract

Setiap domain **WAJIB** memiliki Zod schema sebagai sumber validasi tunggal.

### 5.1 Candidate Zod Schema (Contract)

```ts
CandidateSchema {
  fullName: string (min 3)
  email: valid email
  phoneNumbers: array(string).min(1)
  location: optional string
  status: enum(active | inactive | blacklisted)
}
```

Rules:

* Tidak validasi `id`, `createdAt`, `updatedAt` di form
* Digunakan untuk Create & Update

---

### 5.2 CV Zod Schema (Contract)

```ts
CVSchema {
  title: string (required)
  summary: optional string
  skills: array(string).min(1)

  experiences: array({
    companyName: string
    position: string
    startDate: string
    endDate: optional string
    description: optional string
  }).min(1)

  educations: array({
    institution: string
    degree: string
    startYear: number
    endYear: optional number
  }).min(1)

  expectedSalary: optional number
  preferredEmploymentType: optional enum
}
```

Rules:

* Nested validation wajib
* Array kosong tidak boleh lolos

---

### 5.3 Job Post Zod Schema (Contract)

```ts
JobPostSchema {
  title: string
  department: optional string
  location: string
  description: string

  requirements: array(string).min(1)
  responsibilities: optional array(string)

  employmentType: enum
  salaryRange: optional {
    min: number
    max: number (must be >= min)
  }

  status: enum(draft | published | closed)
}
```

---

## 6. Form State & Validation Integration

### 6.1 Form State Pattern (Mandatory)

Form **TIDAK** boleh langsung bind ke entity.

Gunakan pola:

```ts
type CandidateFormState = {
  fullName: string
  email: string
  phoneNumbers: string[]
  location?: string
  status: CandidateStatus
}
```

Rules:

* Form state = subset entity
* Selalu compatible dengan Zod schema
* Default value eksplisit

---

### 6.2 Validation Flow

1. User submit form
2. Form state divalidasi via Zod
3. Jika invalid:

   * Mapping error ke field
   * Error ditampilkan di komponen Vuetify
4. Jika valid:

   * Kirim ke mutation Vue Query

---

## 7. Form Component Contract

### 7.1 Form Component Responsibility

Setiap domain memiliki minimal:

* `Form` component
* `List / Table` component

Form component:

* Stateless terhadap data fetching
* Menerima:

  * initialValue
  * onSubmit handler
* Mengelola:

  * Local form state
  * Zod validation
  * Dynamic input logic

---

### 7.2 Dynamic Input Rules

Dynamic input WAJIB mendukung:

* Add item
* Remove item
* Validasi per item

Contoh:

* Candidate.phoneNumbers
* CV.skills
* CV.experiences
* JobPost.requirements

---

## 8. Vue Query Contract

### 8.1 Query Pattern

Setiap domain memiliki:

```ts
use<Domain>ListQuery()
use<Domain>DetailQuery(id)
```

Rules:

* Key konsisten per domain
* List dan detail dipisah

---

### 8.2 Mutation Pattern

Setiap domain memiliki:

```ts
useCreate<Domain>Mutation()
useUpdate<Domain>Mutation()
useDelete<Domain>Mutation()
```

Rules:

* invalidateQueries setelah mutation sukses
* Tidak ada side effect langsung di component

---

## 9. Pinia Usage Contract

Pinia digunakan untuk:

* UI state:

  * selected item
  * modal open/close
  * temporary filter
* BUKAN untuk data fetching utama

Rules:

* Tidak duplikasi state Vue Query
* Fokus ke UI orchestration

---

## 10. Mock API Rules

* Data disimpan di memory (array lokal)
* Simulasi delay (300–800ms)
* Response shape konsisten:

```ts
{
  data: T
}
```

---

## 11. Non-Goals

* Authentication
* Authorization
* Real backend
* Workflow lanjutan (application, interview, scoring)

---

## 12. Final Notes

* Dokumen ini adalah **contract**
* Implementasi boleh fleksibel selama:

  * Tidak melanggar contract
  * Konsisten antar domain
* Struktur folder akan didesain ulang terpisah

```
