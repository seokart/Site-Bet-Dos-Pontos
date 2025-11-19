export interface Student {
  id: string
  name: string
  email: string
  class: string
  points: number
  avatar: string
}

export interface Reward {
  id: string
  name: string
  description: string
  points: number
  category: "cantina" | "material" | "extra"
  icon: string
  available: boolean
}

export interface PointTransaction {
  id: string
  studentId: string
  studentName: string
  points: number
  reason: string
  teacherName: string
  date: string
  type: "add" | "remove"
}

// Função para carregar ou inicializar alunos
export function getStudents(): Student[] {
  const stored = localStorage.getItem("students")
  if (stored) {
    return JSON.parse(stored)
  }
  
  const initialStudents: Student[] = [
    { id: "1", name: "Ana Silva", email: "ana@escola.com", class: "8º A", points: 150, avatar: "👧" },
    { id: "2", name: "Carlos Santos", email: "carlos@escola.com", class: "8º A", points: 220, avatar: "👦" },
    { id: "3", name: "Julia Oliveira", email: "julia@escola.com", class: "7º B", points: 180, avatar: "👧" },
    { id: "4", name: "Pedro Costa", email: "pedro@escola.com", class: "9º A", points: 95, avatar: "👦" },
    { id: "5", name: "Maria Souza", email: "maria@escola.com", class: "7º B", points: 310, avatar: "👧" },
  ]
  
  localStorage.setItem("students", JSON.stringify(initialStudents))
  return initialStudents
}

export function saveStudents(students: Student[]) {
  localStorage.setItem("students", JSON.stringify(students))
}

// Função para carregar ou inicializar recompensas
export function getRewards(): Reward[] {
  const stored = localStorage.getItem("rewards")
  if (stored) {
    return JSON.parse(stored)
  }
  
  const initialRewards: Reward[] = [
    { id: "1", name: "Salgado", description: "Salgado da cantina", points: 30, category: "cantina", icon: "🥐", available: true },
    { id: "2", name: "Suco Natural", description: "Suco de frutas", points: 20, category: "cantina", icon: "🧃", available: true },
    { id: "3", name: "Chocolate", description: "Barra de chocolate", points: 25, category: "cantina", icon: "🍫", available: true },
    { id: "4", name: "Caneta", description: "Caneta colorida", points: 40, category: "material", icon: "🖊️", available: true },
    { id: "5", name: "Caderno", description: "Caderno 100 folhas", points: 80, category: "material", icon: "📓", available: true },
    { id: "6", name: "Dispensa de Tarefa", description: "Não fazer uma tarefa", points: 150, category: "extra", icon: "📚", available: true },
  ]
  
  localStorage.setItem("rewards", JSON.stringify(initialRewards))
  return initialRewards
}

export function saveRewards(rewards: Reward[]) {
  localStorage.setItem("rewards", JSON.stringify(rewards))
}

// Função para carregar ou inicializar transações
export function getTransactions(): PointTransaction[] {
  const stored = localStorage.getItem("transactions")
  if (stored) {
    return JSON.parse(stored)
  }
  return []
}

export function saveTransactions(transactions: PointTransaction[]) {
  localStorage.setItem("transactions", JSON.stringify(transactions))
}

export function addTransaction(transaction: Omit<PointTransaction, "id" | "date">) {
  const transactions = getTransactions()
  const newTransaction: PointTransaction = {
    ...transaction,
    id: Date.now().toString(),
    date: new Date().toISOString()
  }
  transactions.unshift(newTransaction)
  saveTransactions(transactions)
  return newTransaction
}