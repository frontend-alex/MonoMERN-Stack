import { describe, it, expect } from 'vitest'
import { emailSchema, usernameSchema, passwordSchema, updateUserSchema } from '@shared/schemas/user/user.schema'

describe('User Schemas', () => {
  describe('emailSchema', () => {
    it('validates correct email addresses', () => {
      const validEmails = [
        'test@example.com',
        'user.name@domain.co.uk',
        'test+tag@example.org'
      ]

      validEmails.forEach(email => {
        const result = emailSchema.safeParse(email)
        expect(result.success).toBe(true)
      })
    })

    it('rejects invalid email addresses', () => {
      const invalidEmails = [
        'invalid-email',
        '@example.com',
        'test@',
        'test.example.com',
        ''
      ]

      invalidEmails.forEach(email => {
        const result = emailSchema.safeParse(email)
        expect(result.success).toBe(false)
        if (!result.success) {
          expect(result.error.issues[0].message).toBe('Invalid email address')
        }
      })
    })
  })

  describe('usernameSchema', () => {
    it('validates usernames with minimum length', () => {
      const validUsernames = ['abc', 'user123', 'test_user', 'a'.repeat(10)]

      validUsernames.forEach(username => {
        const result = usernameSchema.safeParse(username)
        expect(result.success).toBe(true)
      })
    })

    it('rejects usernames that are too short', () => {
      const invalidUsernames = ['ab', 'a', '']

      invalidUsernames.forEach(username => {
        const result = usernameSchema.safeParse(username)
        expect(result.success).toBe(false)
        if (!result.success) {
          expect(result.error.issues[0].message).toBe('Username must be at least 3 characters long')
        }
      })
    })
  })

  describe('passwordSchema', () => {
    it('validates strong passwords', () => {
      const validPasswords = [
        'Password123!',
        'MyStr0ng#Pass',
        'Test123@word'
      ]

      validPasswords.forEach(password => {
        const result = passwordSchema.safeParse(password)
        expect(result.success).toBe(true)
      })
    })

    it('rejects passwords that are too short', () => {
      const result = passwordSchema.safeParse('Ab1!')
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Password must be at least 6 characters long')
      }
    })

    it('rejects passwords without uppercase letters', () => {
      const result = passwordSchema.safeParse('password123!')
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues.some(issue => 
          issue.message === 'Must contain an uppercase letter'
        )).toBe(true)
      }
    })

    it('rejects passwords without lowercase letters', () => {
      const result = passwordSchema.safeParse('PASSWORD123!')
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues.some(issue => 
          issue.message === 'Must contain a lowercase letter'
        )).toBe(true)
      }
    })

    it('rejects passwords without numbers', () => {
      const result = passwordSchema.safeParse('Password!')
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues.some(issue => 
          issue.message === 'Must contain a number'
        )).toBe(true)
      }
    })

    it('rejects passwords without special characters', () => {
      const result = passwordSchema.safeParse('Password123')
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues.some(issue => 
          issue.message === 'Must contain a special character'
        )).toBe(true)
      }
    })
  })

  describe('updateUserSchema', () => {
    it('validates partial user updates', () => {
      const validUpdates = [
        { email: 'new@example.com' },
        { username: 'newusername' },
        { password: 'NewPass123!' },
        { email: 'new@example.com', username: 'newuser' }
      ]

      validUpdates.forEach(update => {
        const result = updateUserSchema.safeParse(update)
        expect(result.success).toBe(true)
      })
    })

    it('rejects empty update objects', () => {
      const result = updateUserSchema.safeParse({})
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Please provide at least one field to update')
      }
    })

    it('validates individual fields in updates', () => {
      const invalidUpdate = {
        email: 'invalid-email',
        username: 'ab',
        password: 'weak'
      }

      const result = updateUserSchema.safeParse(invalidUpdate)
      expect(result.success).toBe(false)
      // Should have multiple validation errors
      expect(result.success ? 0 : result.error.issues.length).toBeGreaterThan(1)
    })
  })
})
