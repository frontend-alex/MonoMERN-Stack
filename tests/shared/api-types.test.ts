import { describe, it, expect } from 'vitest'
import type { 
  ApiSuccessResponse, 
  ApiErrorResponse, 
  ApiResponse,
  ApiError 
} from '@shared/types/api'

describe('API Types', () => {
  describe('ApiSuccessResponse', () => {
    it('should have correct structure for success response', () => {
      const successResponse: ApiSuccessResponse<{ id: string }> = {
        success: true,
        message: 'Operation successful',
        data: { id: '123' }
      }

      expect(successResponse.success).toBe(true)
      expect(successResponse.message).toBe('Operation successful')
      expect(successResponse.data).toEqual({ id: '123' })
    })

    it('should work without data', () => {
      const successResponse: ApiSuccessResponse = {
        success: true,
        message: 'Operation successful'
      }

      expect(successResponse.success).toBe(true)
      expect(successResponse.message).toBe('Operation successful')
      expect(successResponse.data).toBeUndefined()
    })
  })

  describe('ApiErrorResponse', () => {
    it('should have correct structure for error response', () => {
      const errorResponse: ApiErrorResponse<{ field: string }> = {
        success: false,
        errorCode: 'VALIDATION_ERROR',
        statusCode: 400,
        message: 'Validation failed',
        userMessage: 'Please check your input',
        data: { field: 'email' }
      }

      expect(errorResponse.success).toBe(false)
      expect(errorResponse.errorCode).toBe('VALIDATION_ERROR')
      expect(errorResponse.statusCode).toBe(400)
      expect(errorResponse.message).toBe('Validation failed')
      expect(errorResponse.userMessage).toBe('Please check your input')
      expect(errorResponse.data).toEqual({ field: 'email' })
    })

    it('should work without data', () => {
      const errorResponse: ApiErrorResponse = {
        success: false,
        errorCode: 'NOT_FOUND',
        statusCode: 404,
        message: 'Resource not found',
        userMessage: 'The requested resource was not found'
      }

      expect(errorResponse.success).toBe(false)
      expect(errorResponse.data).toBeUndefined()
    })
  })

  describe('ApiResponse Union Type', () => {
    it('should accept success response', () => {
      const response: ApiResponse<{ id: string }> = {
        success: true,
        message: 'Success',
        data: { id: '123' }
      }

      expect(response.success).toBe(true)
    })

    it('should accept error response', () => {
      const response: ApiResponse<{ id: string }, { error: string }> = {
        success: false,
        errorCode: 'ERROR',
        statusCode: 500,
        message: 'Server error',
        userMessage: 'Something went wrong',
        data: { error: 'Internal server error' }
      }

      expect(response.success).toBe(false)
    })
  })

  describe('ApiError Type', () => {
    it('should extend AxiosError with ApiErrorResponse', () => {
      // This test verifies the type structure is correct
      // In real usage, this would be an actual AxiosError
      const mockError: ApiError<{ field: string }> = {
        message: 'Request failed',
        name: 'AxiosError',
        code: 'ERR_BAD_REQUEST',
        config: {} as any,
        request: {} as any,
        response: {
          data: {
            success: false,
            errorCode: 'VALIDATION_ERROR',
            statusCode: 400,
            message: 'Validation failed',
            userMessage: 'Please check your input',
            data: { field: 'email' }
          }
        } as any,
        isAxiosError: true,
        toJSON: () => ({})
      }

      expect(mockError.isAxiosError).toBe(true)
      expect(mockError.response?.data.success).toBe(false)
    })
  })
})
