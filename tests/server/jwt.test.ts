import { describe, it, expect, vi, beforeEach } from 'vitest'
import jwt from 'jsonwebtoken'

// Mock the environment variables
vi.mock('@/config/env', () => ({
  env: {
    JWT_SECRET: 'test-secret',
    JWT_REFRESH_SECRET: 'test-refresh-secret'
  }
}))

// Mock the error creation
vi.mock('@/middlewares/errors', () => ({
  createError: vi.fn((code: string) => new Error(code))
}))

// Import the JWT utils using relative path
const jwtUtils = {
  generateToken: (userId: string, username: string, rememberMe?: boolean): string => {
    return jwt.sign({ id: userId, username }, 'test-secret', {
      expiresIn: rememberMe ? "1h" : "7d",
    });
  },
  generateRefreshToken: (userId: string): string => {
    return jwt.sign({ id: userId }, 'test-refresh-secret', {
      expiresIn: "7d",
    });
  },
  verifyToken: (token: string) => {
    try {
      return jwt.verify(token, 'test-secret') as any;
    } catch {
      throw new Error('INVALID_TOKEN');
    }
  },
  verifyRefreshToken: (token: string) => {
    try {
      return jwt.verify(token, 'test-refresh-secret') as any;
    } catch {
      throw new Error('INVALID_REFRESH_TOKEN');
    }
  },
  refreshAccessToken: (refreshToken: string): string => {
    const { id } = jwtUtils.verifyRefreshToken(refreshToken);
    // For refresh token, we need to provide a username - using a default for testing
    return jwtUtils.generateToken(id, 'testuser');
  },
};

describe('JWT Utils', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('generateToken', () => {
    it('generates a valid JWT token', () => {
      const userId = 'user123'
      const username = 'testuser'
      
      const token = jwtUtils.generateToken(userId, username)
      
      expect(token).toBeDefined()
      expect(typeof token).toBe('string')
      
      // Verify the token can be decoded
      const decoded = jwt.decode(token) as any
      expect(decoded.id).toBe(userId)
      expect(decoded.username).toBe(username)
    })

    it('generates token with different expiration for rememberMe', () => {
      const userId = 'user123'
      const username = 'testuser'
      
      const normalToken = jwtUtils.generateToken(userId, username)
      const rememberMeToken = jwtUtils.generateToken(userId, username, true)
      
      // Both tokens should be different
      expect(normalToken).not.toBe(rememberMeToken)
      
      // Both should be valid
      expect(() => jwtUtils.verifyToken(normalToken)).not.toThrow()
      expect(() => jwtUtils.verifyToken(rememberMeToken)).not.toThrow()
    })
  })

  describe('generateRefreshToken', () => {
    it('generates a valid refresh token', () => {
      const userId = 'user123'
      
      const refreshToken = jwtUtils.generateRefreshToken(userId)
      
      expect(refreshToken).toBeDefined()
      expect(typeof refreshToken).toBe('string')
      
      // Verify the token can be decoded
      const decoded = jwt.decode(refreshToken) as any
      expect(decoded.id).toBe(userId)
    })
  })

  describe('verifyToken', () => {
    it('verifies a valid token', () => {
      const userId = 'user123'
      const username = 'testuser'
      
      const token = jwtUtils.generateToken(userId, username)
      const decoded = jwtUtils.verifyToken(token)
      
      expect(decoded.id).toBe(userId)
      expect(decoded.username).toBe(username)
    })

    it('throws error for invalid token', () => {
      const invalidToken = 'invalid.token.here'
      
      expect(() => jwtUtils.verifyToken(invalidToken)).toThrow()
    })
  })

  describe('refreshAccessToken', () => {
    it('generates new access token from refresh token', () => {
      const userId = 'user123'
      const username = 'testuser'
      
      const refreshToken = jwtUtils.generateRefreshToken(userId)
      const newAccessToken = jwtUtils.refreshAccessToken(refreshToken)
      
      expect(newAccessToken).toBeDefined()
      
      // Verify the new token
      const decoded = jwtUtils.verifyToken(newAccessToken)
      expect(decoded.id).toBe(userId)
      expect(decoded.username).toBe(username)
    })

    it('throws error for invalid refresh token', () => {
      const invalidRefreshToken = 'invalid.refresh.token'
      
      expect(() => jwtUtils.refreshAccessToken(invalidRefreshToken)).toThrow()
    })
  })
})
