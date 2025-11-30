'use client'

import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Trash2 } from 'lucide-react'

const ADMIN_USERS = [
  { id: '1', name: 'John Doe', email: 'john@example.com', joinDate: '2024-12-15', orders: 5 },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', joinDate: '2024-12-10', orders: 3 },
  { id: '3', name: 'Bob Wilson', email: 'bob@example.com', joinDate: '2024-12-05', orders: 8 },
  { id: '4', name: 'Alice Brown', email: 'alice@example.com', joinDate: '2024-11-20', orders: 2 },
]

export default function AdminUsersPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Users</h1>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-4 px-6 font-semibold text-muted-foreground">
                  Name
                </th>
                <th className="text-left py-4 px-6 font-semibold text-muted-foreground">
                  Email
                </th>
                <th className="text-left py-4 px-6 font-semibold text-muted-foreground">
                  Join Date
                </th>
                <th className="text-left py-4 px-6 font-semibold text-muted-foreground">
                  Orders
                </th>
                <th className="text-left py-4 px-6 font-semibold text-muted-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {ADMIN_USERS.map((user) => (
                <tr key={user.id} className="border-b border-border hover:bg-muted/50">
                  <td className="py-4 px-6 font-medium">{user.name}</td>
                  <td className="py-4 px-6 text-muted-foreground">{user.email}</td>
                  <td className="py-4 px-6 text-muted-foreground">{user.joinDate}</td>
                  <td className="py-4 px-6 font-semibold">{user.orders}</td>
                  <td className="py-4 px-6">
                    <Button size="sm" variant="outline" className="text-destructive">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
