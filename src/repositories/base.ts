// src/repositories/base.ts

import { PrismaClient } from "@prisma/client";
import { db } from "@/lib/db";
import { PaginationParams, PaginatedResult } from "@/types";
import { DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE } from "@/constants";

/**
 * Generic CRUD repository base class.
 * Provides standard list/create/update/delete operations
 * that all content entities share.
 */
export class BaseRepository<
  ModelName extends keyof PrismaClient,
  CreateInput,
  UpdateInput = Partial<CreateInput>,
> {
  protected model: PrismaClient[ModelName];

  constructor(modelName: ModelName) {
    this.model = db[modelName];
  }

  /**
   * Find many records with optional filtering, pagination, and ordering.
   */
  async findAll<T = any>(options: {
    where?: Record<string, unknown>;
    orderBy?: Record<string, "asc" | "desc">;
    pagination?: PaginationParams;
    include?: Record<string, unknown>;
    select?: Record<string, unknown>;
  }): Promise<PaginatedResult<T>> {
    const {
      where = {},
      orderBy = { order: "asc" as const },
      pagination,
      include,
      select,
    } = options;

    const limit = Math.min(
      Math.max(pagination?.limit ?? DEFAULT_PAGE_SIZE, 1),
      MAX_PAGE_SIZE
    );
    const offset = Math.max(pagination?.offset ?? 0, 0);

    const prismaArgs: Record<string, unknown> = {
      where,
      orderBy,
      take: limit,
      skip: offset,
    };

    if (include) prismaArgs.include = include;
    if (select) prismaArgs.select = select;

    const [items, total] = await Promise.all([
      (this.model as any).findMany(prismaArgs),
      (this.model as any).count({ where }),
    ]);

    return { items, total };
  }

  /**
   * Find a single record by ID.
   */
  async findById<T = any>(
    id: string,
    options?: { include?: Record<string, unknown> }
  ): Promise<T | null> {
    const args: Record<string, unknown> = { where: { id } };
    if (options?.include) args.include = options.include;
    return (this.model as any).findUnique(args);
  }

  /**
   * Find a single record by a unique field.
   */
  async findByUnique<T = any>(
    where: Record<string, unknown>,
    options?: { include?: Record<string, unknown> }
  ): Promise<T | null> {
    const args: Record<string, unknown> = { where };
    if (options?.include) args.include = options.include;
    return (this.model as any).findUnique(args);
  }

  /**
   * Create a new record.
   */
  async create<T = any>(
    data: CreateInput,
    options?: { include?: Record<string, unknown> }
  ): Promise<T> {
    const args: Record<string, unknown> = { data };
    if (options?.include) args.include = options.include;
    return (this.model as any).create(args);
  }

  /**
   * Update an existing record by ID.
   */
  async update<T = any>(
    id: string,
    data: UpdateInput,
    options?: { include?: Record<string, unknown> }
  ): Promise<T> {
    const args: Record<string, unknown> = { where: { id }, data };
    if (options?.include) args.include = options.include;
    return (this.model as any).update(args);
  }

  /**
   * Delete a record by ID.
   */
  async delete(id: string): Promise<void> {
    await (this.model as any).delete({ where: { id } });
  }

  /**
   * Check if a record exists by ID.
   */
  async exists(id: string): Promise<boolean> {
    const record = await (this.model as any).findUnique({
      where: { id },
      select: { id: true },
    });
    return !!record;
  }
}
